import React from "react";
import { ParquetMetadata } from "@/types/parquet";

interface ParquetMetadataTableProps {
  metadata: ParquetMetadata;
}

export const ParquetMetadataTable: React.FC<ParquetMetadataTableProps> = ({
  metadata,
}) => {
  const columnOrder = [
    "column_id",
    "path_in_schema",
    "type",
    "num_values",
    "stats_null_count",
    "stats_min_value",
    "stats_max_value",
    "compression",
    "encodings",
    "total_uncompressed_size",
    "total_compressed_size",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-lavender-blue-200">
        <thead className="text-xs uppercase bg-lavender-blue-800">
          <tr>
            {columnOrder.map((key) => (
              <th
                key={key}
                className="px-4 py-2 border border-lavender-blue-700"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metadata.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-lavender-blue-900"
                  : "bg-lavender-blue-800"
              }
            >
              {columnOrder.map((key) => (
                <td
                  key={key}
                  className="px-4 py-2 border border-lavender-blue-700"
                >
                  {row[key as keyof typeof row] !== undefined
                    ? String(row[key as keyof typeof row])
                    : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
