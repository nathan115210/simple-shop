import { Request, Response } from 'express';
import Product from '../models/product';

const getAddProduct = async (req: Request, res: Response) => {
  res.render('admin/edit-product', {
    // Use type assertion to treat 'res' as 'any' to access the 'render' method
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};
const defaultImageUrl =
  'https://media.istockphoto.com/id/173015527/fi/valokuva/yksi-punainen-kirja-valkoisella-pinnalla.jpg?s=612x612&w=0&k=20&c=fkhS7Jtv8DUpkORmUf4PWMdFr9j4Ot8GsJH7Bf7vyrY=';
const postAddProduct = async (req: Request, res: Response) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    undefined,
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
const getEditProduct = (req: Request, res: Response) => {
  const isEditMode = req.query.edit === 'true';
  if (!isEditMode) {
    res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: isEditMode,
      product,
    });
  });
};

const postEditProduct = (req: Request, res: Response) => {
  const productId = req.body.productId;
  const updatedProduct = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    productId,
    req.body.imageUrl,
  );
  // add callback, only do redirect after save product is done
  updatedProduct.saveProduct();
  res.redirect('/admin/products');
};

const postDeleteProduct = (req: Request, res: Response) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  // add callback, only do redirect after delete product is done
  res.redirect('/admin/products');
};

export default {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
