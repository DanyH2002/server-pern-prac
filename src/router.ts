import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';


const router = Router();
router.get('/', handleInputErrors, getAllProducts);

router.get('/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getProductById);

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor que 0'),
    handleInputErrors, createProduct);

router.put('/:id',
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

export default router;
