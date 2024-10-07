import React, { useState, useContext } from 'react';
import { Button } from '@/components/button';
import { AuthContext } from '@/components/auth';
import { setDoc, uploadFile } from '@junobuild/core-peer';
import { nanoid } from 'nanoid';
import { ParquetMetadata } from '@/types/parquet';
import { Backdrop } from '@/components/backdrop';

interface SaveButtonProps {
  file: File | null;
  parsedMetadata: ParquetMetadata | null;
  onSaveComplete: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ file, parsedMetadata, onSaveComplete }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const handleSave = async () => {
    if (!file || !parsedMetadata || !user) return;

    setSaving(true);

    try {
      // Save the file blob to the 'files' collection using storage
      const filename = `${user.key}-${file.name}`;
      const { downloadUrl } = await uploadFile({
        collection: 'files',
        data: file,
        filename: filename,
        headers: [
          ["Access-Control-Allow-Origin", "*"],
          ["Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"],
          ["Access-Control-Allow-Headers", "*"],
        ],
      });


      // Save the metadata document to the 'metadata' collection using datastore
      const metadataKey = nanoid();
      await setDoc({
        collection: 'metadata',
        doc: {
          key: metadataKey,
          data: {
            filename: file.name,
            url: downloadUrl,
            metadata: parsedMetadata
          }
        }
      });

      onSaveComplete();
    } catch (error) {
      console.error('Error saving file and metadata:', error);
    }

    setSaving(false);
  };

  return (
    <>
      <Button 
        onClick={handleSave} 
        disabled={!file || !parsedMetadata || saving}
      >
        {saving ? 'Saving...' : 'Save File'}
      </Button>

      {saving && <Backdrop spinner={true} />}
    </>
  );
};