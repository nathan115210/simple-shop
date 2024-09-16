import { Request, Response } from 'express';
import Product from '../models/product';
import { randomInt } from '../util/randomInt';

const getAddProduct = async (req: Request, res: Response) => {
  res.render('admin/add-product', {
    // Use type assertion to treat 'res' as 'any' to access the 'render' method
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
const defaultImageUrl =
  'https://media.istockphoto.com/id/173015527/fi/valokuva/yksi-punainen-kirja-valkoisella-pinnalla.jpg?s=612x612&w=0&k=20&c=fkhS7Jtv8DUpkORmUf4PWMdFr9j4Ot8GsJH7Bf7vyrY=';
const postAddProduct = async (req: Request, res: Response) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    randomInt.toString(),
    req.body.imageUrl || defaultImageUrl,
  );
  product.saveProduct();
  res.redirect('/');
};

const getAdminProducts = async (req: Request, res: Response) => {
  Product.fetchAllProducts(products => {
    res.render('admin/products', {
      products,
      pageTitle: 'Shop | Admin products',
      path: '/admin/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

export default {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
};
