import dotenv from 'dotenv';
import app from './app';
import { sequelize } from './config/sequelize';
import http from 'node:http';
import { Server } from 'socket.io';
import { handleChatEvents } from './utils/websocket/socketEvents.utils';

// carga de variables de entorno, si no usara las seteadas por default en codigo
dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // permitir todas las conexiones
    },
});

const chatNameSpace = io.of('/chat');
// const projectNameSpace = io.of('/project');

chatNameSpace.on('connection', (socket) => {
    handleChatEvents(socket, chatNameSpace);
});

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // await sequelize.sync({ force: true });
        // await initData();
        console.log('Connected to server');
        server.listen(port, () => {
            console.log(`App loaded in port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
