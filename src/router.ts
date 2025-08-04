import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, updateActiveUser } from './handlers/users';

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

// /**
//  * @swagger
//  * /api/products/{id}:
//  *      put:
//  *          summary: Actualizar un producto completamente
//  *          tags:
//  *              - Products
//  *          description: Actualiza toda la información de un producto por su ID
//  *          parameters:
//  *              - name: id
//  *                in: path
//  *                required: true
//  *                schema:
//  *                    type: integer
//  *          requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: "#/components/schemas/Product"
//  *          responses:
//  *              200:
//  *                  description: Producto actualizado
//  *              404:
//  *                  description: Producto no encontrado
//  */

// /**
//  * @swagger
//  * /api/products/{id}:
//  *      patch:
//  *          summary: Actualizar la disponibilidad de un producto
//  *          tags:
//  *              - Products
//  *          description: Cambia solo la propiedad 'availability' de un producto
//  *          parameters:
//  *              - name: id
//  *                in: path
//  *                required: true
//  *                schema:
//  *                    type: integer
//  *          requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: object
//  *                          properties:
//  *                              availability:
//  *                                  type: boolean
//  *                                  example: false
//  *          responses:
//  *              200:
//  *                  description: Disponibilidad actualizada
//  *              404:
//  *                  description: Producto no encontrado
//  */

// /**
//  * @swagger
//  * /api/products/{id}:
//  *      delete:
//  *          summary: Eliminar un producto por ID
//  *          tags:
//  *              - Products
//  *          description: Elimina un producto específico
//  *          parameters:
//  *              - name: id
//  *                in: path
//  *                required: true
//  *                schema:
//  *                    type: integer
//  *          responses:
//  *              200:
//  *                  description: Producto eliminado
//  *              404:
//  *                  description: Producto no encontrado
//  */

// //* Users
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: El ID del usuario
//  *           example: 1
//  *         username:
//  *           type: string
//  *           description: El nombre de usuario
//  *           example: johndoe
//  *         email:
//  *           type: string
//  *           format: email
//  *           description: El correo electrónico del usuario
//  *           example: johndoe@email.com
//  *         password:
//  *           type: string
//  *           description: La contraseña del usuario (solo para creación)
//  *           example: securepassword123
//  *         role:
//  *           type: string
//  *           enum: [admin, user]
//  *           description: El rol del usuario
//  *           example: user
//  *         active:
//  *           type: boolean
//  *           description: Indica si el usuario está activo
//  *           example: true
//  */

// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *     summary: Obtener una lista de todos los usuarios
//  *     tags:
//  *       - Users
//  *     description: Retorna una lista de todos los usuarios registrados
//  *     responses:
//  *       200:
//  *         description: Lista de usuarios obtenida exitosamente
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: "#/components/schemas/User"
//  */

// /**
//  * @swagger
//  * /api/users/{id}:
//  *   get:
//  *     summary: Obtener un usuario por ID
//  *     tags:
//  *       - Users
//  *     description: Retorna un usuario específico por su ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario a buscar
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *     responses:
//  *       200:
//  *         description: Usuario encontrado
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: "#/components/schemas/User"
//  *       400:
//  *         description: ID inválido proporcionado
//  *       404:
//  *         description: Usuario no encontrado
//  */

// /**
//  * @swagger
//  * /api/users:
//  *   post:
//  *     summary: Crear un nuevo usuario
//  *     tags:
//  *       - Users
//  *     description: Registra un nuevo usuario en el sistema
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - email
//  *               - password
//  *               - role
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 minLength: 3
//  *                 maxLength: 100
//  *                 description: Nombre de usuario
//  *                 example: johndoe
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: Correo electrónico del usuario
//  *                 example: johndoe@example.com
//  *               password:
//  *                 type: string
//  *                 minLength: 6
//  *                 maxLength: 100
//  *                 description: Contraseña del usuario
//  *                 example: securepassword123
//  *               role:
//  *                 type: string
//  *                 enum: [admin, user]
//  *                 description: Rol del usuario
//  *                 example: user
//  *     responses:
//  *       201:
//  *         description: Usuario creado exitosamente
//  *       400:
//  *         description: Datos de entrada inválidos
//  */

// /**
//  * @swagger
//  * /api/users/{id}:
//  *   put:
//  *     summary: Actualizar completamente un usuario
//  *     tags:
//  *       - Users
//  *     description: Actualiza toda la información de un usuario existente
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario a actualizar
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - id
//  *               - username_V
//  *               - email_V
//  *               - role_V
//  *             properties:
//  *               id:
//  *                 type: integer
//  *                 minimum: 1
//  *                 description: ID del usuario (debe coincidir con el ID en la URL)
//  *                 example: 1
//  *               username_V:
//  *                 type: string
//  *                 minLength: 3
//  *                 maxLength: 100
//  *                 description: Nuevo nombre de usuario
//  *                 example: newusername
//  *               email_V:
//  *                 type: string
//  *                 format: email
//  *                 description: Nuevo correo electrónico
//  *                 example: newemail@example.com
//  *               role_V:
//  *                 type: string
//  *                 enum: [admin, user]
//  *                 description: Nuevo rol del usuario
//  *                 example: admin
//  *     responses:
//  *       200:
//  *         description: Usuario actualizado exitosamente
//  *       400:
//  *         description: Datos de entrada inválidos
//  *       404:
//  *         description: Usuario no encontrado
//  */

// /**
//  * @swagger
//  * /api/users/{id}:
//  *   patch:
//  *     summary: Actualizar el estado activo de un usuario
//  *     tags:
//  *       - Users
//  *     description: Cambia el estado activo/inactivo de un usuario
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario a actualizar
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - active
//  *             properties:
//  *               active:
//  *                 type: boolean
//  *                 description: Nuevo estado del usuario (true/false)
//  *                 example: false
//  *     responses:
//  *       200:
//  *         description: Estado del usuario actualizado exitosamente
//  *       400:
//  *         description: Datos de entrada inválidos
//  *       404:
//  *         description: Usuario no encontrado
//  */

// /**
//  * @swagger
//  * /api/users/{id}:
//  *   delete:
//  *     summary: Eliminar un usuario
//  *     tags:
//  *       - Users
//  *     description: Elimina un usuario existente por su ID
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario a eliminar
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *     responses:
//  *       200:
//  *         description: Usuario eliminado exitosamente
//  *       400:
//  *         description: ID inválido proporcionado
//  *       404:
//  *         description: Usuario no encontrado
//  */

const router = Router();
//* Products
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
router.get('/products', handleInputErrors, getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtener un producto por ID
 *          tags:
 *              - Products
 *          description: Regresa un producto por ID
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a consultar
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Producto encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              types: array
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: Producto no encontrado
 *              400:
 *                  description: Solicitud erronea
 */
router.get('/products/:id',
    param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getProductById);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Crear un nuevo producto
 *          tags:
 *              - Products
 *          description: Agrega un nuevo producto a la base de datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Juego de mesa"
 *                              price:
 *                                  type: number
 *                                  example: 60
 *          responses:
 *              201:
 *                  description: Producto creado exitosamente
 *                  content:
 *                      application/json:
 *                         schema:  
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Datos invalidos
 *                          
 */
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

// * Users
router.get('/users', handleInputErrors, getAllUsers);

router.get('/users/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getUserById);

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

router.put('/users/:id',
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

router.patch('/users/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, updateActiveUser);

router.delete('/users/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, deleteUser);

export default router;