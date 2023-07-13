import { Sequelize } from "sequelize";
import dotnev from "dotenv";
dotnev.config();

const options = {
    dialect: process.env.DB_TYPE as any,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) as number,
    timezone: process.env.DB_TIME as string
}

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    options
);