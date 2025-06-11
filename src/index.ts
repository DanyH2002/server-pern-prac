// import { suma } from "./funciones.js";
// console.log("hola, estoy vivo de milagro");
// suma(5, 10);

import server from "./server.js";
server.listen(4000, () => {
    console.log('El puerto 4000 está funcionando')
})