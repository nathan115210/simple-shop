import express from 'express';
import addProductController from '../controllers/products';

const router = express.Router();
const { getAddProduct, postAddProduct } = addProductController;

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

export default router;
