import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();
router.get('/', handleInputErrors, getAllProducts);

router.get('/:id', handleInputErrors, getProductById);

router.post('/', handleInputErrors, createProduct);

router.put('/:id', handleInputErrors,updateProduct );

router.delete('/:id', handleInputErrors, deleteProduct);

export default router;
