import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';


const router = Router();
router.get('/products', handleInputErrors, getAllProducts);

router.get('/products/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getProductById);

router.post('/products',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor que 0'),
    handleInputErrors, createProduct);

router.put('/products/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor que 0'),
    handleInputErrors, updateProduct);

router.patch('/products/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, updateAvailability);

router.delete('/products/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, deleteProduct);
    
export default router;
