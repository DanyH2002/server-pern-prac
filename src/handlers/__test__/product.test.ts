import request from "supertest";
import server from "../../server";
import { createProduct, getAllProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "../product";
import Product from "../../models/Product.mo";
jest.mock("../product")

describe("POST /api/products", () => {
    it("Debe mostrar errores de validación si el cuerpo está vacío", async () => {
        const res = await request(server).post("/api/products").send({});
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200)
    });
    it("Price debe ser mayor a 0", async () => {
        const res = await request(server).post('/api/products').send({ name: 'Agua', price: 0 })
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Price debe ser un numero valido", async () => {
        const res = await request(server).post('/api/products').send({ name: 'Agua', price: 'abc' })
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Crear el producto si los datos son validos", async () => {
        const res = await request(server).post('/api/products').send({ name: 'Agua', price: 10 })
        expect(res.status).toBe(200)
        expect(res.status).not.toBe(400)
    });
    it("No debe devolver 404 en ninguna circunstancia", async () => {
        const res = await request(server).post('/api/products').send({ name: 'Chocolate', price: 10 })
        expect(res.status).not.toBe(404)
    });
});

describe("GET /api/products", () => {
    it("Devuelve un status 200", async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.status).not.toBe(400)
    });
    it("Devuelve los datos en formato JSON", async () => {
        const res = await request(server).get('/api/products')
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.header['content-type']).not.toMatch(/text/)
    });
    it("La respuesta debe contener una propiedad data", async () => {
        const res = await request(server).get('/api/products')
        expect(res.body).toHaveProperty('data')
    });
    it("La respuesta 'no' debe tener la propiedad errors", async () => {
        const res = await request(server).get('/api/products')
        expect(res.body).not.toHaveProperty('errors')
    });
});

describe("GET /api/products/:id", () => {
    it("Retornar 404 si el producto no existe", async () => {
        const res = await request(server).get('/api/products/100')
        expect(res.status).toBe(404)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).get('/api/products/abc')
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 200 y los datos del producto si el ID es valido", async () => {
        const createRes = await request(server).post("/api/products").send({ name: "Café", price: 25 });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;

        const res = await request(server).get(`/api/products/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
    });
});

describe("PUT /api/products/:id", () => {
    it("Validar que el ID en la URL sea valido", async () => {
        const res = await request(server).put('/api/products/abc').send({ name: 'Agua', price: 10, avaiability: true })
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Retornar errores si el cuerpo esta vacio o faltan campos", async () => {
        const res = await request(server).put('/api/products/13').send({})
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Validar que el price sea mayor a 0", async () => {
        const res = await request(server).put('/api/products/14').send({ name: 'Agua', price: 0, avaiability: true })
        expect(res.status).toBe(400)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 404 si el producto no existe", async () => {
        const res = await request(server).put('/api/products/9999').send({ name: 'Miel', price: 10, avaiability: true })
        expect(res.status).toBe(404)
        expect(res.status).not.toBe(200)
    });
    it("Retornar 200 si el producto se actualiza correctamente", async () => {
        const createRes = await request(server).post("/api/products").send({ name: "Refresco", price: 15 });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;

        const res = await request(server).put(`/api/products/${id}`).send({ name: "Agua mineral", price: 10, avaiability: true });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.name).toBe("Agua mineral");
    });
});

describe("PATCH /api/products/:id", () => {
    it("Retornar 404 si el producto no existe", async () => {
        const res = await request(server).patch("/api/products/99999");
        expect(res.status).toBe(404);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 200 si se cambia correctamente la disponibilidad", async () => {
        const createRes = await request(server).post("/api/products").send({ name: "Refresco", price: 15 });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;

        const getRes = await request(server).get(`/api/products/${id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.status).not.toBe(400);
        expect(typeof getRes.body.data.avaiability).toBe("boolean");
        const patchRes = getRes.body.data.avaiability;

        const res = await request(server).patch(`/api/products/${id}`);
        expect(res.status).toBe(200);
        expect(res.status).not.toBe(400);
        expect(res.body.data.avaiability).not.toBe(patchRes)
    });
    it("Verificar que availability se alterna (true ↔ false)", async () => {
        const createRes = await request(server).post("/api/products").send({ name: "Jugo", price: 15 });
        expect(createRes.status).toBe(200);
        const id = createRes.body.data.id;

        const getRes = await request(server).get(`/api/products/${id}`);
        expect(getRes.status).toBe(200);
        expect(typeof getRes.body.data.avaiability).toBe("boolean");
        const patchRes = getRes.body.data.avaiability;

        const res = await request(server).patch(`/api/products/${id}`);
        expect(res.status).toBe(200);
        expect(res.status).not.toBe(400);
        expect(typeof res.body.data.avaiability).toBe("boolean");
        const patchRes2 = res.body.data.avaiability;
        expect(patchRes).not.toBe(patchRes2);
    });
});

describe("DELETE /api/products/:id", () => {
    it("Validar el ID en la URL", async () => {
        const res = await request(server).delete("/api/products/abc");
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).delete("/api/products/abc");
        expect(res.status).toBe(400);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 404 si el producto no existe", async () => {
        const res = await request(server).delete("/api/products/100");
        expect(res.status).toBe(404);
        expect(res.status).not.toBe(200);
    });
    it("Retornar 200 y un mensaje si se elimina correctamente", async () => {
        const postRes = await request(server).post('/api/products').send({ name: 'Chocolate', price: 10 });
        const id = postRes.body.data.id;
        expect(postRes.status).toBe(200);
        const res = await request(server).delete(`/api/products/${id}`);
        expect(res.status).toBe(200);
        expect(res.status).not.toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe(`Producto eliminado con id: ${id}`);
    });
});

// describe("Pase de logs", () => {
//     it("No se crea el producto", async () => {
//         const req = { body: { name: "Café", price: 20 } };
//         const res = { json: jest.fn() };
//         jest.spyOn(Product, "create").mockRejectedValueOnce(new Error("Error al crear el producto"));
//         const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
//         await createProduct(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al crear el producto")
//         );
//     });
//     it("No debe mostrar productos", async () => {
//         const req = {};
//         const res = {};
//         jest.spyOn(Product, "findAll").mockRejectedValueOnce(new Error("Error al obtener los productos"));
//         const logSpy = jest.spyOn(console, "log");
//         await getAllProducts(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al obtener los productos")
//         );
//     });
//     it("Falla al obtener el producto por ID", async () => {
//         const req = { params: { id: "1" } };
//         const res = { status: jest.fn(() => res), json: jest.fn() };
//         jest.spyOn(Product, "findByPk").mockRejectedValueOnce(new Error("Error al obtener el producto"));
//         const logSpy = jest.spyOn(console, "log");
//         await getProductById(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al obtener el producto")
//         );
//     });
//     it("Falla la actualización del producto", async () => {
//         const req = { params: { id: "1" }, body: { name: "Nuevo" } };
//         const res = { status: jest.fn(() => res), json: jest.fn() };
//         jest.spyOn(Product, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar el producto"));
//         const logSpy = jest.spyOn(console, "log");
//         await updateProduct(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al actualizar el producto")
//         );
//     });
//     it("Falla al actualizar la disponibilidad", async () => {
//         const req = { params: { id: "1" } };
//         const res = { status: jest.fn(() => res), json: jest.fn() };
//         jest.spyOn(Product, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar la disponibilidad del producto"));
//         const logSpy = jest.spyOn(console, "log");
//         await updateAvailability(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al actualizar la disponibilidad del producto")
//         );
//     });
//     it("Falla al eliminar el producto", async () => {
//         const req = { params: { id: "1" } };
//         const res = { status: jest.fn(() => res), json: jest.fn() };
//         jest.spyOn(Product, "findByPk").mockRejectedValueOnce(new Error("Error al eliminar el producto"));
//         const logSpy = jest.spyOn(console, "log");
//         await deleteProduct(req, res);
//         expect(logSpy).toHaveBeenCalledWith(
//             expect.stringContaining("Error al eliminar el producto")
//         );
//     });
// })
