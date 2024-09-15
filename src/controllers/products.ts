import { Request, Response } from 'express';
import Product from '../models/product';
import deleteProductFromFile from '../util/deleteProductFromFile';

const getAddProduct = async (req: Request, res: Response) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  // render the add-product.pug file
  // res.render('add-product', {
  //   pageTitle: 'Add Product',
  //   path: '/admin/add-product',
  // });

  res.render('admin/add-product', {
    // Use type assertion to treat 'res' as 'any' to access the 'render' method
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const postAddProduct = async (req: Request, res: Response) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    Math.random().toString(),
  );
  product.saveProduct();
  res.redirect('/');
};

const getProducts = async (req: Request, res: Response) => {
  deleteProductFromFile('211');
  Product.fetchAllProducts(products => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'My Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

export default { getAddProduct, postAddProduct, getProducts };
