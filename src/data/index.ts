import db from "../config/db";

const args = process.argv.slice(2);
const models = db.models;

async function clearDatabase() {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Base de datos conectada correctamente")
        if (args.includes('--clear')) {
            for (const model in models) {
                await models[model].destroy({
                    where: {},
                    force: true
                });
                console.log(`Modelo ${model} borrado correctamente`)
            }
        } else {
            console.log("No se incluye el argumento --clear")
        }
    } catch (error) {
        console.error("Error al limpiar la base de datos:", error);
    }
}

clearDatabase();
