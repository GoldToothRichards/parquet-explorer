import { z } from "zod";

const BigIntString = z.union([z.string(), z.bigint()]).transform(String);

export const ParquetColumnMetadataSchema = z.object({
  file_name: z.string(),
  row_group_id: BigIntString,
  row_group_num_rows: BigIntString,
  row_group_num_columns: BigIntString,
  row_group_bytes: BigIntString,
  column_id: BigIntString,
  file_offset: BigIntString,
  num_values: BigIntString,
  path_in_schema: z.string(),
  type: z.string(),
  stats_min: z.string().nullable(),
  stats_max: z.string().nullable(),
  stats_null_count: BigIntString,
  stats_distinct_count: z.string().nullable(),
  stats_min_value: z.string().nullable(),
  stats_max_value: z.string().nullable(),
  compression: z.string(),
  encodings: z.string(),
  index_page_offset: z.string().nullable(),
  dictionary_page_offset: BigIntString.nullable(),
  data_page_offset: BigIntString,
  total_compressed_size: BigIntString,
  total_uncompressed_size: BigIntString,
});

export const ParquetMetadataSchema = z.array(ParquetColumnMetadataSchema);

export type ParquetColumnMetadata = z.infer<typeof ParquetColumnMetadataSchema>;
export type ParquetMetadata = z.infer<typeof ParquetMetadataSchema>;
