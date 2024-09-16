import path from 'path';

export const productsDataPath = (filePath: string): string =>
  path.join(path.dirname(process.mainModule?.filename || ''), 'data', filePath);
