import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';

//* Produstos
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtener una lista de los productos
 *          tags:
 *              - Products
 *          description: Regresa una lista de productos
 *          responses: 
 *              200:
 *                  description: Respuesta exitosa
 *                  content: 
 *                      aplication/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 * 
 */

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtener un producto por ID
 *          tags:
 *              - Products
 *          description: Regresa un producto específico por su ID
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Producto encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Crear un nuevo producto
 *          tags:
 *              - Products
 *          description: Agrega un nuevo producto al sistema
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              201:
 *                  description: Producto creado exitosamente
 */

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Actualizar un producto completamente
 *          tags:
 *              - Products
 *          description: Actualiza toda la información de un producto por su ID
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              200:
 *                  description: Producto actualizado
 *              404:
 *                  description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Actualizar la disponibilidad de un producto
 *          tags:
 *              - Products
 *          description: Cambia solo la propiedad 'availability' de un producto
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              availability:
 *                                  type: boolean
 *                                  example: false
 *          responses:
 *              200:
 *                  description: Disponibilidad actualizada
 *              404:
 *                  description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Eliminar un producto por ID
 *          tags:
 *              - Products
 *          description: Elimina un producto específico
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Producto eliminado
 *              404:
 *                  description: Producto no encontrado
 */

//* Users
/**
 * @swagger
 * components:
 *      schemas:
 *          Users:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The User ID
 *                      example: 1
 *                  username:
 *                      type: string
 *                      description: The Username
 *                      example: Daniela Luna
 *                  email:
 *                      type: string
 *                      description: The User email
 *                      example: example@gmail.com
 *                  password:
 *                      type: string
 *                      description: The User passsword
 *                      example: 123pass
 * 
 */

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
