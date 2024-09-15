import express from 'express';
import addProductController from '../controllers/products';

const router = express.Router();

router.get('/', addProductController.getProducts);

export default router;
