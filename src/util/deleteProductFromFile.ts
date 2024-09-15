import fs from 'fs';
import Product from '../models/product';
import { productsDataPath } from './getProductsFromFile';

const deleteProductFromFile = (productId: string) => {
  Product.fetchAllProducts(products => {
    const product = products.find(product => product.id === productId);
    if (!product) {
      return;
    }
    const updatedProducts = products.filter(
      product => product.id !== productId,
    );
    fs.writeFile(productsDataPath, JSON.stringify(updatedProducts), err => {
      if (!err) {
        console.log('Product deleted successfully');
      }
    });
  });
};

export default deleteProductFromFile;
