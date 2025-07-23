import request from "supertest";
import server from "../server";

describe('mi primer pruea de ts', () => {
    // it()
    // test()
    it('1+1 must give 2', () => {
        expect(1 + 1).toBe(2)
        expect(1 + 1).not.toBe(3) // Contradecir la pruebas
    })
})

describe('Get / api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)

        expect(res.status).not.toBe(400)
    })
})
