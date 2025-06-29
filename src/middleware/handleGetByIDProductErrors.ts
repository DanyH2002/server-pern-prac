import colors from 'colors';
import { validationResult, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleGetByIDProductErrors = async (req: Request, res: Response, next: NextFunction) => {
    console.log(colors.yellow.bold("Validando datos de entrada para obtener producto por ID..."));

    await param('id')
        .notEmpty().withMessage('El ID del producto es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0')
        .run(req)


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(colors.red("Errores encontrados:"), errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}