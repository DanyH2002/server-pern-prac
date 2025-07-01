import { Request, Response } from 'express';
import colors from 'colors';
import Product from '../models/Product.mo';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product });
    } catch (error) {
        console.error(colors.red.bold("Error al crear el producto: " + error));
    }
}


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll(
            {
                order: [['price', 'DESC']],

            }
        );
        console.log(colors.green.bold("Obteniendo todos los productos"));
        res.json({ data: products });
    } catch (error) {
        console.error(colors.red.bold("Error al obtener los productos: " + error));
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ data: product });
    } catch (error) {
        console.error(colors.red.bold("Error al obtener el producto: " + error));
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.update(req.body);
        res.json({ data: product });
    } catch (error) {
        console.error(colors.red.bold("Error al actualizar el producto: " + error));
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        product.avaiability = !product.dataValues.avaiability;
        await product.save();
        res.json({ data: product });
        console.log(colors.green.bold("Disponibilidad del producto actualizada correctamente")); 
    } catch (error) {
        console.error(colors.red.bold("Error al actualizar la disponibilidad del producto: " + error));
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.destroy();
        res.json({ message: `Producto eliminado con id: ${id}` });
    } catch (error) {
        console.error(colors.red.bold("Error al eliminar el producto: " + error));
    }
}
