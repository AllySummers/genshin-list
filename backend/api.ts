import 'server-only';

import * as genshindb from 'genshin-db';
import type { z } from 'zod';

interface MyRequest {
  folder: `${genshindb.Folder}`;
  query: string;
  data?: genshindb.QueryOptions;
}

/**
 * Ensures all calls to genshin-db go through data validation.
 */
export const api = <TSchema extends z.ZodTypeAny>(requestData: MyRequest, responseSchema: TSchema) =>
  // https://github.com/colinhacks/zod/issues/2153#issuecomment-1457357067
  responseSchema.parse(genshindb[requestData.folder](requestData.query, requestData.data)) as z.infer<TSchema>;
