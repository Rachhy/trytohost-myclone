import { Dialect } from "sequelize";
import dotenv from 'dotenv';
import { DatabaseEnum } from "../shared/enums/database.enum";
dotenv.config();

class DatabaseConfig {
    private static commonConfig = {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        models: [__dirname + '/../models/**/*.model.{ts,js}'],
        logging: false
    };

    public static getSequelizeConfig() {
        const dialect = process.env.DB_CONNECTION as Dialect;
        switch (dialect) {
            case DatabaseEnum.MYSQL:
            case DatabaseEnum.POSTGRES:
                return {
                    ...DatabaseConfig.commonConfig,
                    dialect
                };
            default:
                throw new Error('Invalid or unsupported database dialect');
        }
    }
}

export default DatabaseConfig;
