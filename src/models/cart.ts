import fs from 'fs';
import { productsDataPath } from '../util/getDataFromPath';
import { randomInt } from '../util/randomInt';
import type { CartItemProps, CartProps } from '../util/types';
import Product from './product';

const getCartProductsFromFile = (
  filePath: string,
  callback: (items: CartProps) => void,
) => {
  fs.readFile(productsDataPath(filePath), (err, data) => {
    if (err) {
      return callback({ cartItems: [], totalPrice: 0 });
    } else {
      callback(JSON.parse(data.toString()));
    }
  });
};
class Cart {
  constructor(
    public id: CartItemProps['id'],
    public qty: CartItemProps['qty'],
    public productInfo: CartItemProps['productInfo'],
  ) {
    this.id = id;
    this.qty = qty;
    this.productInfo = productInfo;
  }

  static fetchCart(callback: (data: CartProps) => void) {
    getCartProductsFromFile('cartData.json', callback);
  }

  static addProduct(id: string, productPrice: number) {
    // Fetch the previous cart
    fs.readFile(productsDataPath('cartData.json'), (err, fileContent) => {
      let cartData: CartProps = { cartItems: [], totalPrice: 0 };
      if (!err) {
        cartData = JSON.parse(fileContent.toString());
      }
      // Ensure cartItems is always an array
      if (!Array.isArray(cartData.cartItems)) {
        cartData.cartItems = [];
      }
      // Analyze the cart => Find existing product
      const existingProduct: CartItemProps | undefined =
        cartData.cartItems?.find(item => item.productInfo.id === id);

      let updatedProduct: CartItemProps;
      // Add new product/ increase quantity
      if (existingProduct) {
        const existingProductIndex = cartData.cartItems?.findIndex(
          product => product === existingProduct,
        );
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cartData.cartItems = [...cartData.cartItems];
        cartData.cartItems[existingProductIndex] = updatedProduct;
      } else {
        Product.fetchAllProducts(products => {
          const product = products.find(product => product.id === id);
          if (!product) {
            return;
          }
          updatedProduct = {
            id: randomInt.toString(),
            qty: 1,
            productInfo: product,
          };

          cartData.cartItems = [...cartData.cartItems, updatedProduct];
        });
      }

      if (cartData.totalPrice) {
        cartData.totalPrice += productPrice;
      } else {
        cartData.totalPrice = productPrice;
      }

      getCartProductsFromFile('cartData.json', () => {
        fs.writeFile(
          productsDataPath('cartData.json'),
          JSON.stringify(cartData),
          err => {
            console.log('err', err);
          },
        );
      });
    });
  }
}

export default Cart;
