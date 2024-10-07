import React, { useState } from 'react';
import { Button } from '@/components/button';

interface QueryResultTableProps {
  queryResult: any[];
}

export const QueryResultTable: React.FC<QueryResultTableProps> = ({ queryResult }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!queryResult || queryResult.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(queryResult.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = queryResult.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-lavender-blue-700">
              {Object.keys(queryResult[0]).map((key, index) => (
                <th key={index} className="border border-lavender-blue-500 px-4 py-2 text-lavender-blue-100">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-lavender-blue-800' : 'bg-lavender-blue-900'}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="border border-lavender-blue-600 px-4 py-2 text-lavender-blue-200">{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-lavender-blue-500 hover:text-lavender-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lavender-blue-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-lavender-blue-500 hover:text-lavender-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};