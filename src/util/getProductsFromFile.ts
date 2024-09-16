import fs from 'fs';
import { productsDataPath } from './getDataFromPath';
import { ProductProps } from './types';

export const getProductsFromFile = (
  filePath: string,
  callback: (products: ProductProps[] ) => void,
) => {
  fs.readFile(productsDataPath(filePath), (err, data) => {
    if (err) {
      return callback([]);
    } else {
      callback(JSON.parse(data.toString()));
    }
  });
};
