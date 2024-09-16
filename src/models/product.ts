import fs from 'fs';
import { productsDataPath } from '../util/getDataFromPath';
import { getProductsFromFile } from '../util/getProductsFromFile';
import type { ProductProps } from '../util/types';

class Product {
  constructor(
    public title: ProductProps['title'],
    public price: ProductProps['price'],
    public description: ProductProps['description'],
    public id: ProductProps['id'],
    public imageUrl: ProductProps['imageUrl'],
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.id = id;
    this.imageUrl = imageUrl;
  }

  saveProduct() {
    getProductsFromFile('productsData.json', products => {
      products.push(this);
      fs.writeFile(
        productsDataPath('productsData.json'),
        JSON.stringify(products),
        err => {
          console.log(err);
        },
      );
    });
  }
  deletedProduct() {}

  // static makes the method accessible without instantiating the class
  static fetchAllProducts(callback: (products: ProductProps[]) => void) {
    getProductsFromFile('productsData.json', callback);
  }
}

export default Product;
