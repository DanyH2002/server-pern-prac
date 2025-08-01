import request from "supertest";
import server from "../../server";
import User from "../../models/User.mo";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, updateActiveUser } from "../users";

describe("POST /api/users", () => {
    it("Debe mostrar errores de validación si el cuerpo está vacío", async () => {
        const res = await request(server).post('/api/users').send({});
        expect(res.status).toBe(400);
    });
    it("El correo debe ser valido", async () => {
        const res = await request(server).post('/api/users').send({
            username: 'userABC',
            email: 'email',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).toBe(400);
    });
    it("Crear el usurio si los datos son validos", async () => {
        const res = await request(server).post('/api/users').send({
            username: 'userABC',
            email: 'prueba@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
    });
    it("No debe devolver 404 en ninguna circunstancia", async () => {
        const res = await request(server).post('/api/users').send({
            username: 'userJKL',
            email: 'ejemploJKL@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).not.toBe(404);
        expect(res.status).toBe(200);
    });
    it("Debe retornar 400 si falta algún campo", async () => {
        const res = await request(server).post('/api/users').send({
            username: 'testUser'
        });
        expect(res.status).toBe(400);
    });
    it("Debe retornar 400 si el nombre de usuario ya está en uso", async () => {
        await request(server).post('/api/users').send({
            username: 'repetido',
            email: 'repetido1@gmail.com',
            password: 'password123',
            role: 'user'
        });

        const res = await request(server).post('/api/users').send({
            username: 'repetido',
            email: 'repetido2@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).toBe(400);
    });
    it("Debe retornar 400 si el correo electrónico ya está en uso", async () => {
        await request(server).post('/api/users').send({
            username: 'userX',
            email: 'duplicado@gmail.com',
            password: 'password123',
            role: 'user'
        });

        const res = await request(server).post('/api/users').send({
            username: 'userY',
            email: 'duplicado@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(res.status).toBe(400);
    });

});

describe("GET /api/users", () => {
    it("Devuelve un status 200", async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(200)
        expect(res.status).not.toBe(400)
    });
    it("Devuelve los datos en formato JSON", async () => {
        const res = await request(server).get('/api/users')
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.header['content-type']).not.toMatch(/text/)
    });
    it("La respuesta debe contener una propiedad data", async () => {
        const res = await request(server).get('/api/users')
        expect(res.body).toHaveProperty('data')
    });
    it("La respuesta 'no' debe tener la propiedad errors", async () => {
        const res = await request(server).get('/api/users')
        expect(res.body).not.toHaveProperty('errors')
    });
});

describe("GET /api/users/:id", () => {
    it("Retornar 404 si el usuario no existe", async () => {
        const res = await request(server).get('/api/users/9999')
        expect(res.status).toBe(404)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).get('/api/users/abc')
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 200 y los datos del producto si el ID es valido", async () => {
        const createRest = await request(server).post('/api/users').send({
            username: 'userTest',
            email: 'ejemplotest@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(createRest.status).toBe(200);
        const id = createRest.body.data.id;
        const res = await request(server).get(`/api/users/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
    });
    it("Debe retornar 404 si el usuario no existe", async () => {
        const res = await request(server).get('/api/users/999999');
        expect(res.status).toBe(404);
    });

});

describe("PUT /api/users/:id", () => {
    it("Validar que el ID en la URL sea valido", async () => {
        const res = await request(server).put('/api/users/abc').send({
            username_V: 'nextUser',
            email_V: 'nextemail@gmail.com',
            role_V: 'admin'
        });
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200);
    });
    it("Retornar errores si el cuerpo esta vacio o faltan campos", async () => {
        const res = await request(server).put('/api/users/1').send({});
        expect(res.status).toBe(400);
    });
    it("Validar el email_V debe ser valido", async () => {
        const res = await request(server).put('/api/users/1').send({
            username_V: 'otherUser',
            email_V: 'emails',
            role_V: 'admin'
        });
        expect(res.status).toBe(400);
    });
    it("Retornar 400 si el usuario no existe", async () => {
        const res = await request(server).put('/api/users/9999').send({
            username_V: 'newUser',
            email_V: 'newemail@gmail.com',
            role_V: 'admin'
        });
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Debe retornar 400 si se intenta actualizar la contraseña", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'testUser',
            email: 'userXW15@gmail.com',
            password: 'pass123',
            role: 'user'
        });
        expect(createRes.status).toBe(200);
        expect(createRes.body).toHaveProperty('data');
        const id = createRes.body.data.id;
        const res = await request(server).put(`/api/users/${id}`).send({
            id: id,
            username_V: 'testUser',
            email_V: 'user26@gmail.com',
            role_V: 'user',
            password: 'newpass123'
        });
        expect(res.status).toBe(400);
    });
    it("Debe retornar 404 si el usuario está inactivo", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'inactive',
            email: 'inactive@gmail.com',
            password: 'password123',
            role: 'user'
        });
        const id = createRes.body.data.id;
        await request(server).patch(`/api/users/${id}`);

        const res = await request(server).put(`/api/users/${id}`).send({
            id: id,
            username_V: 'inactive',
            email_V: 'newemail@gmail.com',
            role_V: 'user'
        });
        expect(res.status).toBe(404);
    });
    it("Debe retornar 400 si el nombre de usuario ya está en uso", async () => {
        const user1 = await request(server).post('/api/users').send({
            username: 'takenUser',
            email: 'taken@example.com',
            password: 'password123',
            role: 'user'
        });

        const user2 = await request(server).post('/api/users').send({
            username: 'uniqueUser',
            email: 'unique@example.com',
            password: 'password123',
            role: 'user'
        });
        const id = user2.body.data.id;

        const res = await request(server).put(`/api/users/${id}`).send({
            id: user2.body.data.id,
            username_V: 'takenUser',
            email_V: 'unique@example.com',
            role_V: 'user'
        });
        expect(res.status).toBe(400);
    });
    it("Debe retornar 400 si el correo electrónico ya está en uso", async () => {
        const user1 = await request(server).post('/api/users').send({
            username: 'userA',
            email: 'emailA@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(user1.status).toBe(200);
        expect(user1.body).toHaveProperty('data');

        const user2 = await request(server).post('/api/users').send({
            username: 'userB',
            email: 'emailB@gamil.com',
            password: 'password123',
            role: 'user'
        });
        expect(user2.status).toBe(200);
        expect(user2.body).toHaveProperty('data');

        const id = user2.body.data.id;
        const res = await request(server).put(`/api/users/${id}`).send({
            id: id,
            username_V: 'userB',
            email_V: 'emailA@gmail.com',
            role_V: 'user'
        });
        expect(res.status).toBe(400);
    });
    it("Debe retornar 400 si el rol no es válido", async () => {
        const userRes = await request(server).post('/api/users').send({
            username: 'roleUser',
            email: 'role@example.com',
            password: 'password123',
            role: 'user'
        });
        const id = userRes.body.data.id;

        const res = await request(server).put(`/api/users/${id}`).send({
            id,
            username_V: 'roleUser',
            email_V: 'role@example.com',
            role_V: 'superadmin'
        });
        expect(res.status).toBe(400);
    });
    it("Retornar 200 si el producto se actualiza correctamente", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'userOPQ',
            email: 'opq123@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;
        const res = await request(server).put(`/api/users/${id}`).send({
            id: id,
            username_V: 'updatedUser',
            email_V: 'updateEmail@gmail.com',
            role_V: 'user'
        });
        expect(res.status).toBe(200);
        expect(res.body.data.username).toBe('updatedUser');
    });
});

describe("PATCH /api/users/:id", () => {
    it("Retornar 404 si el usuario no existe", async () => {
        const res = await request(server).patch("/api/users/99999");
        expect(res.status).toBe(404);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 200 si se cambia correctamente la disponibilidad", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'userXYZ',
            email: 'xyz123@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;

        const getRes = await request(server).get(`/api/users/${id}`);
        expect(getRes.status).toBe(200);
        expect(typeof getRes.body.data.isActive).toBe("boolean");
        const patchRes = getRes.body.data.isActive;

        const res = await request(server).patch(`/api/users/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.isActive).not.toBe(patchRes)
    });
    it("Verificar que isAcive se alterna (true ↔ false)", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'userLMN',
            email: 'LMN987@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;
        const getRes = await request(server).get(`/api/users/${id}`);
        expect(getRes.status).toBe(200);
        console.log(getRes.body)
        expect(typeof getRes.body.data.isActive).toBe("boolean");
        const patchRes = getRes.body.data.isActive;

        const res = await request(server).patch(`/api/users/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.isActive).not.toBe(patchRes);
    });
});

describe("DELETE /api/users/:id", () => {
    it("Validar el ID en la URL", async () => {
        const res = await request(server).delete("/api/users/abc");
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).delete("/api/users/abc");
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 404 si el usuario no existe", async () => {
        const res = await request(server).delete("/api/users/9999");
        expect(res.status).toBe(404);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 200 y un mensaje si se elimina correctamente", async () => {
        const createRes = await request(server).post('/api/users').send({
            username: 'userDelete',
            email: 'deleteemail@gmail.com',
            password: 'password123',
            role: 'user'
        });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;
        const res = await request(server).delete(`/api/users/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});

describe("Pase de logs", () => {
    it("No se crea el usuario", async () => {
        const req: any = { body: { username: "userHCL", email: 'ejemplo@getMaxListeners.com', password: 'pass987', role: 'user' } };
        const res: any = { json: jest.fn(), status: jest.fn(() => res) };
        jest.spyOn(User, "create").mockRejectedValueOnce(new Error("Error al crear el usuario"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await createUser(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al crear el usuario")
        );
        logSpy.mockRestore();
    });
    it("No debe mostrar usuarios", async () => {
        const req: any = {};
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(User, "findAll").mockRejectedValueOnce(new Error("Error al obtener los usuarios"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await getAllUsers(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al obtener los usuarios")
        );
        logSpy.mockRestore();
    });
    it("Falla al obtener el usurio por ID", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(User, "findByPk").mockRejectedValueOnce(new Error("Error al obtener el usuario por ID"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await getUserById(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al obtener el usuario por ID")
        );
        logSpy.mockRestore();
    });
    it("Falla la actualización del usuario", async () => {
        const req: any = { params: { id: "1" }, body: { username: "userHCL", email: 'ejemplo@getMaxListeners.com', password: 'pass987', role: 'user' } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(User, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar el usuario"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await updateUser(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al actualizar el usuario")
        );
        logSpy.mockRestore();
    });
    it("Falla al actualizar la disponibilidad", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(User, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar el estado del usuario"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await updateActiveUser(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al actualizar el estado del usuario")
        );
        logSpy.mockRestore();
    });
    it("Falla al eliminar el usuario", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(User, "findByPk").mockRejectedValueOnce(new Error("Error al eliminar el usuario"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await deleteUser(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al eliminar el usuario")
        );
        logSpy.mockRestore();
    });
})