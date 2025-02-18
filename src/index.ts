import dotenv from 'dotenv';
import { pool } from './config/database';
import app from './app';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const port = process.env.PORT || 3000;

const main = async () => {
    try {
        const { rows } = await pool.query('SELECT NOW()');
        console.log('Connected to server, time:', rows[0].now);
        app.listen(port, () => {
            console.log(`App loaded in port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
