import { Backdrop } from '@/components/backdrop';
import { deleteAsset, deleteDoc, getDoc } from '@junobuild/core-peer';
import React from 'react';
import { useState } from 'react';


interface DeleteButtonProps {
  fileKey: string;
  filename: string;
  url: string;
  reload: () => Promise<void>;
}

export const DeleteButton= ({ fileKey, filename, url, reload }: DeleteButtonProps) => {
  const [inProgress, setInProgress] = useState(false);

  const deleteFile = async () => {
    setInProgress(true);

    try {
      // Delete the file asset
      const { pathname: fullPath } = new URL(url);
      await deleteAsset({
        collection: 'files',
        fullPath
      });

      const doc = await getDoc({
        collection: 'metadata',
        key: fileKey
      });

      if (!doc) {
        throw new Error('Metadata document not found');
      }

      // Delete the metadata document
      await deleteDoc({
        collection: 'metadata',
        doc: doc
      });

      await reload();
    } catch (err) {
      console.error(err);
    }

    setInProgress(false);
  };

  return (
    <>
      <button
        className="hover:text-red-500 transition-colors pr-1 py-1"
        onClick={deleteFile}
        title={`Delete ${filename}`}
      >
        <svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" fill="currentColor">
          <g>
            <rect fill="none" className="opacity-25" width="29" height="29" />
            <path d="M26.17,5.26h-6.88v-1.26c0-1.35-1.09-2.44-2.44-2.44h-4.7c-1.35,0-2.44,1.1-2.44,2.44v1.26H2.83c-.55,0-1,.45-1,1s.45,1,1,1h1.43l1.2,16.89c.12,1.72,1.57,3.07,3.3,3.07h11.49c1.73,0,3.18-1.35,3.3-3.07l1.2-16.89h1.43c.55,0,1-.45,1-1s-.45-1-1-1ZM11.71,4c0-.24.2-.44.44-.44h4.7c.24,0,.44.2.44.44v1.26h-5.58v-1.26ZM21.55,24.01c-.05.68-.62,1.21-1.3,1.21h-11.49c-.68,0-1.25-.53-1.3-1.21l-1.18-16.75h16.47l-1.18,16.75Z" />
          </g>
        </svg>
      </button>

      {inProgress && <Backdrop spinner={true} />}
    </>
  );
};