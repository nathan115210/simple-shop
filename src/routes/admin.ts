import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();
const {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = adminController;

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getAdminProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', postEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', postDeleteProduct);

export default router;
