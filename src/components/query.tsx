import React, { useState, useEffect, useCallback } from "react";
import { useDuckDb, insertFile } from "duckdb-wasm-kit";
import { QueryResultTable } from "@/components/results";

const MAX_ROWS = 1000;

interface QueryEditorProps {
  url: string;
  filename: string;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ url, filename }) => {
  const [query, setQuery] = useState<string>("");
  const [tableName, setTableName] = useState<string>("");
  const [tableCreated, setTableCreated] = useState(false);
  const [tableError, setTableError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<unknown[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [limitApplied, setLimitApplied] = useState(false);
  const { db, loading: dbLoading, error: dbError } = useDuckDb();

  const createTable = useCallback(async () => {
    if (db && url) {
      try {
        const rootFilename = filename
          .split(".")[0]
          .replace(/[^a-zA-Z0-9]/g, "_");
        setTableName(rootFilename);

        const conn = await db.connect();
        try {
          // Check if the table already exists
          const tableExists = await conn.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = '${rootFilename}'
          `);

          if (tableExists.toArray().length === 0) {
            // Fetch the file content
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], filename);

            // Insert the file into DuckDB
            await insertFile(db, file, rootFilename);
          }

          setTableCreated(true);
          setTableError(null);
          setQuery(`SELECT * FROM ${rootFilename} LIMIT 10`);
        } finally {
          await conn.close();
        }
      } catch (error) {
        console.error("Error creating table:", error);
        setTableError(`Error creating table: ${error}`);
        setTableCreated(false);
      }
    }
  }, [db, url, filename]);

  useEffect(() => {
    void (async () => {
      try {
        await createTable();
      } catch (error) {
        console.error("Error creating table:", error);
      }
    })();
  }, [createTable]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    if (!tableCreated) {
      await createTable();
    }
    if (tableCreated && db) {
      setIsExecuting(true);
      setQueryError(null);
      setQueryResult(null);
      setRowCount(null);
      setLimitApplied(false);
      try {
        const conn = await db.connect();
        try {
          // First, get the total row count
          const countQuery = `SELECT COUNT(*) as count FROM (${query})`;
          const countResult = await conn.query(countQuery);
          const totalCount = parseInt(
            countResult.getChild("count").toArray()[0],
          );
          setRowCount(totalCount);

          // Then, execute the limited query
          const limitedQuery = `SELECT * FROM (${query}) LIMIT ${MAX_ROWS}`;
          const result = await conn.query(limitedQuery);
          setQueryResult(result.toArray());

          if (totalCount > MAX_ROWS) {
            setLimitApplied(true);
          }
        } finally {
          await conn.close();
        }
      } catch (error) {
        console.error("Error executing query:", error);
        setQueryError(`Error executing query: ${error}`);
      }
      setIsExecuting(false);
    }
  };

  if (dbLoading)
    return <div className="text-lavender-blue-100">Loading DuckDB...</div>;
  if (dbError)
    return (
      <div className="text-lavender-blue-100">
        Error loading DuckDB: {dbError.message}
      </div>
    );

  return (
    <div className="bg-lavender-blue-900 p-2">
      <h3 className="text-xl font-bold text-lavender-blue-100 mb-8">
        Query Editor: {filename}
      </h3>
      {tableError && <p className="text-red-500 mb-2">{tableError}</p>}
      <div className="mb-4">
        <textarea
          value={query}
          onChange={handleQueryChange}
          className="w-full h-32 p-2 bg-lavender-blue-800 text-lavender-blue-100 rounded mb-2"
          placeholder={`Enter your SQL query here...\nExample: SELECT * FROM ${tableName} LIMIT 10`}
        />
        <div className="flex justify-end">
          <button
            onClick={handleQuerySubmit}
            disabled={isExecuting}
            className="bg-lavender-blue-600 hover:bg-lavender-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lavender-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExecuting ? "Executing..." : "Execute Query"}
          </button>
        </div>
      </div>
      {queryError && <div className="text-red-500 mb-2">{queryError}</div>}
      {rowCount !== null && (
        <div className="text-lavender-blue-200 mb-2">
          Total results: {rowCount}{" "}
          {limitApplied && `(showing first ${MAX_ROWS})`}
        </div>
      )}
      {queryResult && <QueryResultTable queryResult={queryResult} />}
    </div>
  );
};
