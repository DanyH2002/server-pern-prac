//import request from "supertest";
//import server from "../server";
import { connectDB } from "../server";
import db from "../config/db";
jest.mock("../config/db")

/*describe('mi primer pruea de ts', () => {
    // it()
    // test()
    it('1+1 must give 2', () => {
        expect(1 + 1).toBe(2)
        expect(1 + 1).not.toBe(3) // Contradecir la pruebas
    })
})

describe('Get / api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.status).not.toBe(400)
    })
})*/

describe('Connect to database', () => {
    it('should be ', async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("No se pudo conectar a la base de datos"));
        const logSpy = jest.spyOn(console, "log");
        await connectDB();
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("No se pudo conectar a la base de datos")
        );
    })
})
