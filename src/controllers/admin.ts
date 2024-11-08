import { Request, Response } from 'express';
import Product from '../models/product';
import { CustomUserRequest, ProductProps } from '../util/types';

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

const postAddProduct = async (req: CustomUserRequest, res: Response) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl || defaultImageUrl;
  if (!req.user) {
    res.redirect('/login');
  } else {
    try {
      const title = await req.body.title;
      const price = (await req.body.price) || '0';
      const description = (await req.body.description) || 'default description';
      const imageUrl = (await req.body.imageUrl) || defaultImageUrl;

      await req.user.createProduct({
        title,
        price,
        description,
        imageUrl,
      });
      res.redirect('/admin/products');
    } catch (err) {
      console.error('postAddProduct error:', err);
      res.redirect('/500');
    }
  }
};

const getAdminProducts = async (req: CustomUserRequest, res: Response) => {
  console.log('Loading admin products page - getAdminProducts()');
  if (!req.user) {
    res.redirect('/login');
  } else {
    try {
      const products = await req.user.getProducts(); //TODO: figure out only showing the products created by the user
      res.render('admin/products', {
        products,
        pageTitle: 'Shop | Admin products',
        path: '/admin/products',
      });
    } catch (err) {
      console.error('postAddProduct error:', err);
      res.redirect('/500');
    }
  }
};
const getEditProduct = async (req: CustomUserRequest, res: Response) => {
  const isEditMode = req.query.edit === 'true';
  if (!isEditMode) {
    return res.redirect('/');
  }
  if (!req.user) {
    res.redirect('/login');
  } else {
    // way 1: get the product by user
    try {
      const prodId = await req.params.productId;
      const products = await req.user.getProducts({
        where: { id: prodId },
      });
      const product = products ? products[0] : null;
      if (!product) {
        return res.redirect('/');
      } else {
        console.log('product:', product);
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: isEditMode,
          product,
        });
      }
    } catch (error) {
      console.error('getEditProduct error:', error);
      res.redirect('/500');
    }
  }

  // way 2: get the product by id
  // Product.findByPk(prodId)
  //   .then((product: ProductProps | null) => {
  //     if (!product) {
  //       return res.redirect('/');
  //     }
  //     res.render('admin/edit-product', {
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: isEditMode,
  //       product,
  //     });
  //   })
};

const postEditProduct = async (req: Request, res: Response) => {
  try {
    const productId: ProductProps['id'] = await req.body.productId;
    const updatedTitle: ProductProps['title'] = await req.body.title;
    const updatedPrice: ProductProps['price'] = await req.body.price;
    const updatedImageUrl: ProductProps['imageUrl'] = await req.body.imageUrl;
    const updatedDescription: ProductProps['description'] =
      await req.body.description;
    const product = await Product.findByPk(productId);
    if (product) {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      product.save();
      console.log('lalala');
      res.redirect('/admin/products');
    }
  } catch (error) {
    console.error('postEditProduct error:', error);
    res.redirect('/500');
  }
};

const postDeleteProduct = (req: Request, res: Response) => {
  const productId = req.body.productId;
  // 2 ways to delete a product
  /**
   * use destroy method, with where clause => { where: { id: productId } }
   */
  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.redirect('/admin/products');
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err: unknown) => console.error('postDeleteProduct() error:', err));
  /**
     * use findByPk method, then call destroy method
     * 
     *
      Product.findByPk(productId)
      .then((product: Product | null) => {
        return product?.destroy();
      })
      .then(() => {
        res.redirect('/admin/products');
      })
      .catch((err: unknown) => console.error('postDeleteProduct() error:', err));
      *
      *
     */
};

export default {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
