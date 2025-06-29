import colors from 'colors';
import { validationResult, body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleUpdateProductErrors = async(req: Request, res: Response, next: NextFunction) => {
    console.log(colors.yellow.bold("Validando datos de entrada para actualizar producto..."));
    await Promise.all([
        param('id')
            .notEmpty().withMessage('El ID del producto es obligatorio')
            .isNumeric().withMessage('El ID debe ser un número')
            .custom(value => value > 0).withMessage('El ID debe ser mayor que 0')
            .run(req),

        body('id')
            .notEmpty().withMessage('El ID del producto es obligatorio')
            .isNumeric().withMessage('El ID debe ser un número')
            .custom(value => value > 0).withMessage('El ID debe ser mayor que 0')
            .custom((value, { req }) => value == req.params.id).withMessage('El ID del producto debe coincidir con el ID en la URL')
            .run(req),

        body('name')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
            .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres')
            .run(req),

        body('price')
            .notEmpty().withMessage('El precio es obligatorio')
            .isNumeric().withMessage('El precio debe ser un número')
            .custom(value => value > 0).withMessage('El precio debe ser mayor que 0')
            .run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(colors.red("Errores encontrados:"), errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}