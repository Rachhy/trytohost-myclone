import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import DatabaseConfig from './configs/db.config';
import NotFoundException from './exceptions/not-found';
import routers from './routers';
import ErrorsFilter from './shared/exceptions';

const app: Application = express();

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Init application
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

/**==================================================================
 * @noted Register a route to render the HTML file
 */
app.get('/', (_req, res) => {
    res.render('index');
});

/**==================================================================
 * @noted Use all routes with prefix service
 */
app.use('/api', routers);

/**==================================================================
 * @noted Custom Not Found handler for route request
 * Only Works for Unmatched Routes
 */
app.use((req, _res, next) => {
    next(new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`));
});
/**==================================================================
 * @noted Register global error handling filter
 */
app.use(ErrorsFilter.error());


const bootstrap = async () => {
    try {
        // Connect to the Dadabase
        const sequelize = new Sequelize(DatabaseConfig.getSequelizeConfig());
        await sequelize.authenticate();
        // Port app running
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`\x1b[32mApplication running on host: \x1b[34mhttp://localhost:${PORT}\x1b[37m`);
        });
    } catch (error) {
        // Use a type assertion to tell TypeScript `error` is of type `Error`
        console.error('\x1b[33mUnable to connect to the database: \x1b[31m' + (error as Error).message + '\x1b[0m');
        process.exit(1); // It's common to use `1` or another non-zero value to indicate an error exit
    }
}
bootstrap();
