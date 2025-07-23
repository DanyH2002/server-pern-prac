// import { suma } from "./funciones.js";
// console.log("hola, estoy vivo de milagro");
// suma(5, 10);

import server from "./server"
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto:  ${port}`);
})

//? Formas de reconocer supertest
// server.test.ts
// configurar supertest
// manejar todas las pruebas en una carpeta
// __tests__
