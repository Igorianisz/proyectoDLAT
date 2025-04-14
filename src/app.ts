import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';

import swaggerSpec from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import cors from 'cors';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const path = process.env.MAIN_PATH || '/api/v1';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
app.use(express.static('public')); // servir archivos estáticos

// app.use(express.static('public'));

// Setup Swagger documentation
app.use(`${path}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ruta de acceso de info de usuario, implica leer, actualizar y registra usuario
// Ruta actualmente con todas sus subrutas protegidas, pero % de cambio a futuro
// por lo que evitar poner el middleware en este nivel.
app.use(`${path}/user`, userRoute);

// ruta de auth de usuarios, implica login de usuario y registro de este
app.use(`${path}/auth`, authRoute);

app.use(`${path}/project`, projectRoute);

// manejador de errores de las rutas
app.use(httpErrorHandle);

export default app;
