//import request from "supertest";
//import server from "../server";
import { connectDB } from "../server";
import db from "../config/db";
jest.mock("../config/db")

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
