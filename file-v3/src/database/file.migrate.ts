import { Sequelize } from 'sequelize-typescript';
import DatabaseConfig from '../configs/db.config';
import "colors";

const migrate = async () => {

    const sequelize = new Sequelize(DatabaseConfig.getSequelizeConfig());
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log('Migrations have been recreate successfully.'.green);
        process.exit(0);
    } catch (error) {
        console.log(((error as Error).message).red);
        process.exit(0);
    }

}

migrate();