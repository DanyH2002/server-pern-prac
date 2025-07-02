import { Request, Response } from 'express';
import colors from 'colors';
import User from '../models/User.mo';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'Debe proporcionar username, email, password y rol.' });
        }
        if (await User.findOne({ where: { username } })) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }
        if (await User.findOne({ where: { email } })) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso.' });
        }
        const user = await User.create(req.body);
        await user.save();
        res.json({ data: user });
        console.log(colors.green.bold("Usuario creado correctamente: "), user.toJSON());
    } catch (error) {
        console.error(colors.red.bold("Error al crear el usuario: " + error.message));
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
        console.log(colors.green.bold("Obteniendo todos los usuarios por username"));
        res.json({ data: users });
    } catch (error) {
        console.error(colors.red.bold("Error al obtener los usuarios: " + error));
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user || !user.isActive) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const { username_V, email_V, role_V } = req.body;
        if (!username_V || !email_V || !role_V) {
            return res.status(400).json({ error: 'Debe proporcionar username, email y/o el rol para poder actualizar los datos correctamente.' });
        }
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
        const roles_P = ['admin', 'user'];
        if (!roles_P.includes(role_V)) {
            return res.status(400).json({ error: 'Rol no permitido. Los roles permitidos son: admin, user.' });
        }
        user.username = req.body.username_V;
        user.email = req.body.email_V;
        user.role = req.body.role_V;
        await user.save();
        res.json({ data: user });
        console.log(colors.green.bold("Usuario actualizado correctamente: "), user.toJSON());
    } catch (error) {
        console.error(colors.red.bold("Error al actualizar el usuario: " + error));
    }
}

export const deleteUser_S = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (!user.isActive) {
            return res.status(400).json({ error: 'El usuario ya fue desactivado y no se puede modificar más.' });
        }
        user.isActive = false;
        await user.save();
        res.json({ data: user });
        console.log(colors.green.bold("Estado del usuario actualizado correctamente"));
    } catch (error) {
        console.error(colors.red.bold("Error al actualizar el estado del usuario: " + error));
    }
}
