import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import projectRoute from './routes/project.route';
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';

import swaggerSpec from './config/swagger';
import swaggerUi from 'swagger-ui-express';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const path = process.env.MAIN_PATH || '/api/v1';

const app = express();

// Setup Swagger documentation
app.use(`${path}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(loggerMiddleware);

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
