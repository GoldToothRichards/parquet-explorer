import { AuthContext } from '@/components/auth';
import { ParquetMetadataTable } from '@/components/metadata';
import { DeleteButton } from '@/components/delete';
import { DownloadButton } from '@/components/download';
import { QueryExecutor } from '@/components/query';
import { listDocs } from '@junobuild/core-peer';
import { useContext, useEffect, useState, useCallback } from 'react';
import React from 'react';
import { CloseButton } from '@/components/close';

interface ParquetFileMetadata {
  key: string;
  data: {
    filename: string;
    url: string;
    metadata: any;
  };
}

type ActiveModal = 'metadata' | 'query' | null;

export const FileList: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState<ParquetFileMetadata[]>([]);
  const [activeFileKey, setActiveFileKey] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const listParquetFiles = useCallback(async () => {
    if (user) {
      const { items } = await listDocs<ParquetFileMetadata['data']>({
        collection: 'metadata',
        filter: {}
      });
      setFiles(items);
    } else {
      setFiles([]);
      setActiveFileKey(null);
      setActiveModal(null);
    }
  }, [user]);

  useEffect(() => {
    listParquetFiles();
  }, [listParquetFiles, refreshTrigger]);

  const handleFileSelect = (key: string, modalType: ActiveModal) => {
    setActiveFileKey(key);
    setActiveModal(modalType);
  };

  const handleDelete = useCallback(async () => {
    setActiveFileKey(null);
    setActiveModal(null);
    await listParquetFiles();
  }, [listParquetFiles]);

  const closeModal = () => {
    setActiveFileKey(null);
    setActiveModal(null);
  };

  return (
    <div className="w-full mt-8 text-white">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Files</h2>
        <div className="space-y-4 mb-8">
          {files.map((file) => (
            <React.Fragment key={file.key}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-lavender-blue-500 border-[3px] rounded bg-black text-white transition-all shadow-[4px_4px_0px_#7888FF]">
                <span className="mb-2 sm:mb-0">{file.data.filename}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    className="text-lavender-blue-500 hover:text-lavender-blue-400 px-2 py-1 rounded border border-lavender-blue-500 hover:bg-lavender-blue-900"
                    onClick={() => handleFileSelect(file.key, 'metadata')}
                  >
                    View Metadata
                  </button>
                  <button 
                    className="text-lavender-blue-500 hover:text-lavender-blue-400 px-2 py-1 rounded border border-lavender-blue-500 hover:bg-lavender-blue-900"
                    onClick={() => handleFileSelect(file.key, 'query')}
                  >
                    Query
                  </button>
                  <DownloadButton
                    url={file.data.url}
                    filename={file.data.filename}
                  />
                  <DeleteButton
                    fileKey={file.key}
                    filename={file.data.filename}
                    url={file.data.url}
                    reload={handleDelete}
                  />
                </div>
              </div>
              {activeFileKey === file.key && activeModal && (
                <div className="mt-4 w-full bg-lavender-blue-900 p-6 rounded-lg shadow-lg relative">
                  <div className="max-w-6xl mx-auto">
                    {activeModal === 'metadata' && (
                      <>
                        <h3 className="text-lg font-bold mb-2">Metadata for {file.data.filename}</h3>
                        <ParquetMetadataTable metadata={file.data.metadata} />
                      </>
                    )}
                    {activeModal === 'query' && (
                      <QueryExecutor url={file.data.url} filename={file.data.filename} />
                    )}
                    <CloseButton onClick={closeModal} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};