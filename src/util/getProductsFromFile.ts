import fs from 'fs';
import path from 'path';
import { ProductProps } from './types';

export const productsDataPath: string = path.join(
  path.dirname(process.mainModule?.filename || ''),
  'data',
  'productsData.json',
);

export const getProductsFromFile = (
  callback: (products: ProductProps[]) => void,
) => {

  fs.readFile(productsDataPath, (err, data) => {
    if (err) {
      return callback([]);
    } else {
      callback(JSON.parse(data.toString()));
    }
  });
};
