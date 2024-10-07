import React, { useRef, useState } from 'react';
import { useDuckDb, useDuckDbQuery, insertFile } from 'duckdb-wasm-kit';
import { Button } from '@/components/button';
import * as duckdb from "@duckdb/duckdb-wasm";
import { ParquetMetadataSchema, ParquetMetadata } from '@/types/parquet';
import { ParquetMetadataTable } from '@/components/metadata';
import { SaveButton } from '@/components/save';

export const FileSelector: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { db, loading: dbLoading, error: dbError } = useDuckDb();
  const [query, setQuery] = useState<string>('');
  const { arrow: metadata, loading: queryLoading, error: queryError } = useDuckDbQuery(query);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedMetadata, setParsedMetadata] = useState<ParquetMetadata | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && db) {
      try {
        await db.registerFileHandle(
          uploadedFile.name,
          uploadedFile,
          duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
          true
        );
        setFile(uploadedFile);
        const name = uploadedFile.name.replace('.parquet', '');
        await insertFile(db, uploadedFile, name);
        setQuery(`SELECT * FROM parquet_metadata('${uploadedFile.name}');`);
      } catch (error) {
        console.error('Error analyzing file:', error);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveComplete = () => {
    setFile(null);
    setParsedMetadata(null);
  };

  React.useEffect(() => {
    if (metadata) {
      try {
        const parsedData = ParquetMetadataSchema.parse(metadata.toArray());
        setParsedMetadata(parsedData);
      } catch (error) {
        console.error('Error parsing metadata:', error);
        setParsedMetadata(null);
      }
    }
  }, [metadata]);

  if (dbLoading) return <div>Loading DuckDB...</div>;
  if (dbError) return <div>Error loading DuckDB: {dbError.message}</div>;

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".parquet"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center px-4 py-2 border border-dashed border-lavender-blue-300 rounded-lg text-lavender-blue-300 hover:bg-lavender-blue-900 hover:border-lavender-blue-200 hover:text-lavender-blue-100 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Choose File
        </button>
      </div>
      {file && <p className="text-lavender-blue-200 text-center">File selected: {file.name}</p>}
      {queryLoading && <p className="text-lavender-blue-600">Loading metadata...</p>}
      {queryError && <p className="text-red-500">Error loading metadata: {queryError.message}</p>}
      {parsedMetadata && (
        <div>
          <ParquetMetadataTable metadata={parsedMetadata} />
          <div className="mt-4 flex justify-end">
            <SaveButton 
              file={file}
              parsedMetadata={parsedMetadata}
              onSaveComplete={handleSaveComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
};