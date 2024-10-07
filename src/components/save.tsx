import React, { useState, useContext } from "react";
import { Button } from "@/components/button";
import { AuthContext } from "@/components/auth";
import { setDoc, uploadFile, listDocs } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import { ParquetMetadata } from "@/types/parquet";
import { Backdrop } from "@/components/backdrop";

interface SaveButtonProps {
  file: File | null;
  parsedMetadata: ParquetMetadata | null;
  onSaveComplete: (success: boolean) => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  file,
  parsedMetadata,
  onSaveComplete,
}) => {
  const [saving, setSaving] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const handleSave = async () => {
    if (!file || !parsedMetadata || !user) return;

    setSaving(true);

    try {
      // Check for duplicate file names
      const { items } = await listDocs({
        collection: "metadata",
        filter: {
          matcher: {
            key: `^${file.name}$`,
          },
        },
      });

      if (items.length > 0) {
        alert(
          "A file with this name already exists. Please choose a different name.",
        );
        setSaving(false);
        return;
      }

      // Save the file blob to the 'files' collection using storage
      const { downloadUrl } = await uploadFile({
        collection: "files",
        data: file,
        filename: file.name,
        headers: [
          ["Access-Control-Allow-Origin", "*"],
          ["Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"],
          ["Access-Control-Allow-Headers", "*"],
        ],
      });

      // Save the metadata document to the 'metadata' collection using datastore
      await setDoc({
        collection: "metadata",
        doc: {
          key: file.name,
          data: {
            filename: file.name,
            url: downloadUrl,
            metadata: parsedMetadata,
          },
        },
      });

      onSaveComplete(true);
    } catch (error) {
      console.error("Error saving file and metadata:", error);
      onSaveComplete(false);
    }

    setSaving(false);
  };

  return (
    <>
      <Button
        onClick={handleSave}
        disabled={!file || !parsedMetadata || saving}
      >
        {saving ? "Saving..." : "Save File"}
      </Button>

      {saving && <Backdrop spinner={true} />}
    </>
  );
};
