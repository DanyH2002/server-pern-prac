import { Request, Response } from 'express';
import colors from 'colors';
import User from '../models/User.mo';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        if (await User.findOne({ where: { username } })) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }
        if (await User.findOne({ where: { email } })) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        }
        const user = await User.create(req.body);
        await user.save();
        res.json({ data: user });
    } catch (error) {
        console.log(colors.red.bold("Error al crear el usuario"));
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [
                ['username', 'DESC']
            ],
            limit: 5,
            where: {
                isActive: true
            }
        });
        res.json({ data: users });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener los usuarios"));
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user || !user.isActive) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ data: user });
    } catch (error) {
        console.log(colors.red.bold("Error al obtener el usuario por ID"));
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user || !user.isActive) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const { username_V, email_V } = req.body;
        if (req.body.password) {
            return res.status(400).json({ error: 'No se puede actualizar la contraseña directamente.' });
        }
        if (username_V !== user.username) {
            const existingUser = await User.findOne({ where: { username: username_V } });
            if (existingUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
            }
        }
        if (email_V !== user.email) {
            const existingEmail = await User.findOne({ where: { email: email_V } });
            if (existingEmail) {
                return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
            }
        }
        user.username = req.body.username_V;
        user.email = req.body.email_V;
        user.role = req.body.role_V;
        await user.save();
        res.json({ data: user });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar el usuario"));
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log(colors.red.bold("Error al eliminar el usuario"));
    }
}

export const updateActiveUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.isActive = !user.dataValues.isActive;
        await user.save();
        res.json({ data: user });
    } catch (error) {
        console.log(colors.red.bold("Error al actualizar el estado del usuario"));
    }
}
