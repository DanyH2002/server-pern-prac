import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

//const db  = new Sequelize('postgresql://pern_test_api_k7cx_user:xsxwfgouIwj9WEWxnB4qN5sTmqs6Dlp5@dpg-d168bmvdiees739ik8fg-a.oregon-postgres.render.com/pern_test_api_k7cx');
const db = new Sequelize(process.env.BD_URL,{
    models: [__dirname + '/../models/**/*.ts']
});

export default db;