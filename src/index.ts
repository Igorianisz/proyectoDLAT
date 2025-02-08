import dotenv from 'dotenv';
import app from './app';
import { sequelize } from './config/sequelize';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const port = process.env.PORT || 3000;

const main = async () => {
    try {
        // const { rows } = await pool.query('SELECT NOW()');
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connected to server');
        app.listen(port, () => {
            console.log(`App loaded in port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
