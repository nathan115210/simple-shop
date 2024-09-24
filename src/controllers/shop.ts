import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/product';
import { ProductProps } from '../util/types';

const getProducts = async (req: Request, res: Response) => {
  Product.fetchAllProducts(products => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'Shop | All products',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId; // /products/:productId
  Product.fetchAllProducts(products => {
    const product: ProductProps | undefined = products.find(
      product => product.id === productId,
    );
    if (product) {
      res.render('shop/product-detail', {
        product: products.find(product => product.id === productId),
        pageTitle: 'Shop | Product detail',
        path: `/products`,
      });
    } else {
      // if the product is not found, redirect to 404 page
      res.redirect('/404');
    }
  });
};

const getShopIndexPage = async (req: Request, res: Response) => {
  Product.fetchAllProducts(products => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop | Index',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getCartPage = async (req: Request, res: Response) => {
  Cart.fetchCart(cartData => {
    Product.fetchAllProducts(products => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cartData.cartItems.find(
          item => item.productInfo.id === product.id,
        );
        if (cartProductData) {
          cartProducts.push({ productInfo: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Shop | Cart',
        path: '/cart',
        // cartItems: cartData.cartItems,
        cartItems: cartProducts,
        totalPrice: cartData.totalPrice,
      });
    });
  });
};

const postCartPage = async (req: Request, res: Response) => {
  const productId = req.body.productId;

  Product.fetchAllProducts(products => {
    const product: ProductProps | undefined = products.find(
      product => product.id === productId,
    );
    if (product) {
      Cart.addProduct(productId, +(product.price || 20));
    } else {
      // if the product is not found, redirect to 404 page
      res.redirect('/404');
    }
  });
  res.redirect('/cart');
};

const getOrdersPage = async (req: Request, res: Response) => {
  Product.fetchAllProducts(products => {
    res.render('shop/orders', {
      products,
      pageTitle: 'Shop | Orders',
      path: '/orders',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getCheckoutPage = async (req: Request, res: Response) => {
  Product.fetchAllProducts(products => {
    res.render('shop/checkout', {
      products,
      pageTitle: 'Shop | Checkout',
      path: '/checkout',
    });
  });
};
const postCartDeleteProduct = async (req: Request, res: Response) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    if (product.price) {
      Cart.deleteProduct(productId, +product.price);
    }
    res.redirect('/cart');
  });
};

export default {
  getProducts,
  getProductById,
  getShopIndexPage,
  getCartPage,
  postCartPage,
  getCheckoutPage,
  getOrdersPage,
  postCartDeleteProduct,
};
