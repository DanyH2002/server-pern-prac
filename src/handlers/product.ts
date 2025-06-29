import { Request, Response } from 'express';
import colors from 'colors';
import Product from '../models/Product.mo';
import { handleCreateProductErrors } from '../middleware/handleCreateProductErrors';
import { handleUpdateProductErrors } from '../middleware/handleUpdateProductErrors';
import { handleDeleteProductErrors } from '../middleware/handleDeleteProductErrors';
import { handleGetByIDProductErrors } from '../middleware/handleGetByIDProductErrors';

export const createProduct = [
    handleCreateProductErrors,
    async (req: Request, res: Response) => {
        const product = await Product.create(req.body);
        res.json({ data: product });
    }
];

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    console.log(colors.green.bold("Obteniendo todos los productos"));
    res.json({ data: products });
}

export const getProductById = [handleGetByIDProductErrors,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ data: product });
    }
];

export const updateProduct = [handleUpdateProductErrors,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.update(req.body);
        res.json({ data: product });
    }
];

export const deleteProduct = [handleDeleteProductErrors,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await product.destroy();
        res.json({ message: 'Producto eliminado exitosamente' });
    }
];
