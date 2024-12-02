import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// ruta de acceso de info de usuario, implica leer, actualizar y registra usuario
// Ruta actualmente con todas sus subrutas protegidas, pero % de cambio a futuro
// por lo que evitar poner el middleware en este nivel.
app.use("/api/v1/user", userRoute)

// ruta de auth de usuarios, implica login de usuario y registro de este
app.use("/api/v1/auth", authRoute)

app.listen(port, () => {
    console.log(`App loaded in port ${port}`)
})