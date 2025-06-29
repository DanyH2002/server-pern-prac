import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.cyan.bold("Conexión a la base de datos establecida correctamente"));
    }
    catch (error) {
        console.log(colors.white.bgRed.bold("No se pudo conectar a la base de datos: " + error));
    }
}

connectDB();

// Instacia del servidor
const server = express();

// leer datos de formulario
server.use(express.json());

server.use('/', router);
export default server 
