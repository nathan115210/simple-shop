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
      //Update the product is the product ID exists
      //TODO: update cartItem if product is updated
      if (this.id) {
        const existingProductIndex = products.findIndex(
          products => products.id === this.id,
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(
          productsDataPath('productsData.json'),
          JSON.stringify(updatedProducts),
          err => {
            console.log(err);
          },
        );
      } else {
        // Add new product into the DB
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(
          productsDataPath('productsData.json'),
          JSON.stringify(products),
          err => {
            console.log(err);
          },
        );
      }
    });
  }
  // deletedProduct() {}
  static findById(id: string, callback: (product: ProductProps) => void) {
    getProductsFromFile('productsData.json', products => {
      const product = products.find(p => p.id === id);
      if (product) callback(product);
    });
  }

  // static makes the method accessible without instantiating the class
  static fetchAllProducts(callback: (products: ProductProps[]) => void) {
    getProductsFromFile('productsData.json', callback);
  }
}

export default Product;
