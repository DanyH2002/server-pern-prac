import express from 'express';
import router from './router.js';
//import { request } from 'http';
const server = express();
// server.get('/', (request, response) => { 
//     response.send("Hola, somos galletas")
// })
// server.post('/', (request, response) => {
//     response.send("Soy Patman, y estoy aquí para salvar el día")
// })

server.use('/', router);
export default server 