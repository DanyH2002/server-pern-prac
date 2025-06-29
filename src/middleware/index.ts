import colors from 'colors';
import {validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const handleInputErrors = (req:Request, res: Response, next:NextFunction ) => {
    console.log(colors.yellow.bold("Validando datos de entrada..."));
    // Verificar errores de validación
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
