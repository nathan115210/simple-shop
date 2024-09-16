import express from 'express';
import addProductController from '../controllers/shop';

const router = express.Router();

router.get('/products', addProductController.getProducts);
// Get the product id from URL params, to display the product details in a new page
router.get('/products/:productId', addProductController.getProductById);
router.get('/', addProductController.getShopIndexPage);
router.get('/cart', addProductController.getCartPage);
router.post('/cart', addProductController.postCartPage);
router.get('/checkout', addProductController.getCheckoutPage);
router.get('/orders', addProductController.getOrdersPage);

export default router;
