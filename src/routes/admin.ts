import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();
const { getAddProduct, postAddProduct, getAdminProducts } = adminController;

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getAdminProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

export default router;
