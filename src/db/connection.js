import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

//carga variables de entorno (.env)
dotenv.config();

//Extraer variables de entorno
const dbName = process.env.DB_NAME || 'decotortas_db';

const dbUser = process.env.DB_USER || 'root';

const dbPassword = process.env.DB_PASSWORD || '';

const dbHost = process.env.DB_HOST || 'localhost';

const dbDialect = process.env.DB_DIALECT || 'mysql';

const dbPort = process.env.DB_PORT || 3000;

//Creamos la instancia de sequalize

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    host:dbHost,
    dialect: dbDialect,
    port: dbPort,
    logging: false //Desactiva los logs de SQL
})

export default sequelize;
