import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import { pool } from './config/database';
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';

import swaggerSpec from './config/swagger';
import swaggerUi from 'swagger-ui-express';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Setup Swagger documentation
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(loggerMiddleware);

// ruta de acceso de info de usuario, implica leer, actualizar y registra usuario
// Ruta actualmente con todas sus subrutas protegidas, pero % de cambio a futuro
// por lo que evitar poner el middleware en este nivel.
app.use('/api/v1/user', userRoute);

// ruta de auth de usuarios, implica login de usuario y registro de este
app.use('/api/v1/auth', authRoute);

app.use('/api/v1/project', projectRoute);

// manejador de errores de las rutas
app.use(httpErrorHandle);

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
