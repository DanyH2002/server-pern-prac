import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';
import { createUser, getAllUsers, updateUser, deleteUser_S } from './handlers/users';

const router = Router();
router.get('/product', handleInputErrors, getAllProducts);

router.get('/product/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getProductById);

router.post('/product',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor que 0'),
    handleInputErrors, createProduct);

router.put('/product/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    body('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0')
        .custom((value, { req }) => value == req.params.id).withMessage('El ID del producto debe coincidir con el ID en la URL'),
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor que 0'),
    handleInputErrors, updateProduct);

router.patch('/product/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, updateAvailability);

router.delete('/product/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, deleteProduct);

router.get('/users', handleInputErrors, getAllUsers);

router.post('/users',
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre de usuario no puede tener más de 100 caracteres'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .isLength({ max: 100 }).withMessage('La contraseña no puede tener más de 100 caracteres'),
    body('role')
        .notEmpty().withMessage('El rol es obligatorio')
        .isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
    handleInputErrors, createUser);

router.put('/user/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    body('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0')
        .custom((value, { req }) => value == req.params.id).withMessage('El ID del producto debe coincidir con el ID en la URL'),
    body('username_V')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres')
        .isLength({ max: 100 }).withMessage('El nombre de usuario no puede tener más de 100 caracteres'),
    body('email_V')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('role_V')
        .notEmpty().withMessage('El rol es obligatorio')
        .isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
    handleInputErrors, updateUser);

router.delete('/user/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, deleteUser_S);

export default router;
