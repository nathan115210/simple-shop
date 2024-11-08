import { Request, Response } from 'express';
import Cart from '../models/cart';
import Order from '../models/order';
import Product from '../models/product';

import OrderItem from '../models/orderItem';
import { CustomUserRequest, ProductProps } from '../util/types';

const getProducts = async (_req: Request, res: Response) => {
  console.log('Loading products page - getProducts()');
  Product.findAll({ raw: true })
    .then((products: ProductProps[]) => {
      res.render('shop/product-list', {
        products,
        path: '/products',
        pageTitle: 'All products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err: unknown) => console.error('getProducts error:', err));
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId; // /products/:productId
  Product.findByPk(productId).then((product: ProductProps | null) => {
    if (product) {
      res.render('shop/product-detail', {
        product,
        pageTitle: product.title,
        path: `/products`,
      });
    }
  });
};

const getShopIndexPage = async (_req: Request, res: Response) => {
  console.log('Loading Shop page - getShopIndexPage()');
  Product.findAll({ raw: true })
    .then((products: ProductProps[]) => {
      res.render('shop/index', {
        products,
        path: '/',
        pageTitle: 'Shop | Index',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err: unknown) => console.error('getShopIndexPage error:', err));
};

const getCartPage = async (req: CustomUserRequest, res: Response) => {
  console.log('Loading Cart page - getCartPage()');
  if (req.user) {
    try {
      const cart = await req.user.getCart();
      if (cart) {
        const cartItems = await cart.getProducts();
        const totalPrice = cartItems.reduce((result, product) => {
          if (product.price)
            return result + product.price * product.CartItem.qty;
          return result;
        }, 0);

        res.render('shop/cart', {
          pageTitle: 'Shop | Cart',
          path: '/cart',
          cartItems,
          totalPrice: totalPrice,
        });
      }
    } catch (error) {
      console.error('getCartPage error:', error);
      res.redirect('/500');
    }
  } else {
    res.redirect('/login');
  }
};

const postCartPage = async (req: CustomUserRequest, res: Response) => {
  console.log('posting Cart page - postCartPage()');
  const productId = req.body.productId;
  let fetchedCart: Cart | null = null;

  if (req.user) {
    try {
      const cart = await req.user.getCart();
      if (cart) {
        fetchedCart = cart;
        const products = await cart.getProducts({ where: { id: productId } });
        console.log('get by id, ', products);
        let product = products ? products[0] : null;
        let newQty = 1;

        if (product) {
          //If the product is already in the cart, update the quantity
          newQty = product.CartItem.qty + 1;
          await product.CartItem.update({ qty: newQty });
        }
        product = await Product.findByPk(productId);
        product?.id;
        if (product && fetchedCart) {
          await fetchedCart.addProduct(product, {
            through: {
              qty: newQty,
            },
          });
        }
      }
      res.redirect('/cart');
    } catch (error) {
      console.error('postCartPage error:', error);
      res.redirect('/500');
    }
  } else {
    res.redirect('/login');
  }
};

const postCartDeleteProduct = async (req: CustomUserRequest, res: Response) => {
  console.log('posting cart delete product - postCartDeleteProduct()');
  const productId = req.body.productId;
  if (!req.user) {
    res.redirect('/login');
  } else {
    try {
      const productId = await req.body.productId;
      const cart = await req.user.getCart();
      const products = await cart.getProducts({ where: { id: productId } });
      await products[0].CartItem.destroy();
      res.redirect('/cart');
    } catch (error) {
      console.error('postCartDeleteProduct error:', error);
      res.redirect('/500');
    }
  }
};

const postOrder = async (req: CustomUserRequest, res: Response) => {
  console.log('posting order - postCartDeleteProduct()');
  // let fetchedCart: Cart | null = null;
  if (!req.user) {
    res.redirect('/login');
  } else {
    try {
      const cart = await req.user.getCart();
      const products = await cart.getProducts();
      const order = await req.user.createOrder();
      await order.addProducts(
        products.map(product => {
          product.OrderItem = { qty: product.CartItem.qty } as OrderItem;
          return product;
        }),
      );
      await cart.setProducts(null); // Clear the cart
      res.redirect('/orders');
    } catch (error) {
      console.error('postOrder error:', error);
      res.redirect('/500');
    }
  }
};

const getOrdersPage = async (req: CustomUserRequest, res: Response) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    req.user
      .getOrders({ include: ['Products'] })
      .then((orders: Order[]) => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders,
        });
      })
      .catch((err: unknown) => {
        console.error('getOrdersPage error:', err);
        res.redirect('/500');
      });
  }
};

const getCheckoutPage = async (req: Request, res: Response) => {
  // Product.fetchAllProducts(products => {
  //   res.render('shop/checkout', {
  //     products,
  //     pageTitle: 'Shop | Checkout',
  //     path: '/checkout',
  //   });
  // });
};

export default {
  getProducts,
  getProductById,
  getShopIndexPage,
  getCartPage,
  postCartPage,
  getCheckoutPage,
  getOrdersPage,
  postOrder,
  postCartDeleteProduct,
};
