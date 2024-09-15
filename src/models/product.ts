import fs from 'fs';
import {
  getProductsFromFile,
  productsDataPath,
} from '../util/getProductsFromFile';
import type { ProductProps } from '../util/types';

class Product {
  constructor(
    public title: ProductProps['title'],
    public price: ProductProps['price'],
    public description: ProductProps['description'],
    public id: ProductProps['id'],
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.id = id;
  }

  saveProduct() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(productsDataPath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  deletedProduct() {}

  // static makes the method accessible without instantiating the class
  static fetchAllProducts(callback: (products: ProductProps[]) => void) {
    getProductsFromFile(callback);
  }
}

export default Product;
