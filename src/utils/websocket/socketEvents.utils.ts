import { Namespace, Socket } from 'socket.io';

// export const handleSocketEvents = (socket: Socket, io: Server) => {
//     socket.on('message', (message) => {
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });

//     socket.on('error', (error) => {
//         console.error('Socket error:', error);
//     });

//     // Ejemplo de evento para notificaciones de proyectos
//     socket.on('projectUpdate', (project) => {
//         io.emit('projectUpdate', project);
//     });

//     // Ejemplo de evento para mensajes de chat
//     socket.on('chatMessage', (message) => {
//         io.emit('chatMessage', message);
//     });
// };

const activeUsers: {
    [userId: string]: { email: string; roomId: string; lastLogin: Date };
} = {};

const messages: {
    [roomId: string]: {
        message: string;
        email: string;
        socketId: string;
        date: Date;
    }[];
} = {};

const pushMessages = (
    roomId: string,
    message: string,
    socketId: string,
    email: string,
) => {
    if (!messages[roomId]) {
        messages[roomId] = [];
    }
    messages[roomId].push({ message, email, socketId, date: new Date() });
};

const manageActiveUsers = (userId: string, email: string, roomId: string) => {
    activeUsers[userId] = { email, roomId, lastLogin: new Date() };
};

const removeActiveUser = (userId: string) => {
    if (activeUsers[userId]) {
        delete activeUsers[userId];
    }
};

export const handleChatEvents = (socket: Socket, namespace: Namespace) => {
    socket.on('userList', (chatRoomId) => {
        const filteredActiveUserByRoom = Object.values(activeUsers).filter(
            (user) => user.roomId === chatRoomId,
        );
        console.log(filteredActiveUserByRoom);
        namespace.to(chatRoomId).emit('userList', filteredActiveUserByRoom);
        socket.emit('userList', filteredActiveUserByRoom);
    });

    socket.on('joinChatRoom', (chatRoomId, user) => {
        const { email } = user;
        socket.join(chatRoomId);
        const chatMessage = {
            message: `Joined the chat room ${chatRoomId}`,
            userId: socket.id,
            email,
            date: new Date(),
        };

        if (messages[chatRoomId]) {
            socket.emit('previousMessages', messages[chatRoomId]);
        }
        pushMessages(chatRoomId, chatMessage.message, socket?.id, email);
        namespace.to(chatRoomId).emit('chatMessage', chatMessage.message, user);
        activeUsers[socket.id] = {
            email,
            roomId: chatRoomId,
            lastLogin: new Date(),
        };
        namespace.to(chatRoomId).emit('userList', activeUsers, chatRoomId);
    });

    socket.on('leaveChatRoom', (chatRoomId, user) => {
        const { email } = user;
        const chatMessage = {
            message: ` User left chat room ${chatRoomId}`,
            userId: socket.id,
            email,
            date: new Date(),
        };
        pushMessages(chatRoomId, chatMessage.message, socket?.id, email);
        socket.broadcast
            .to(chatRoomId)
            .emit('chatMessage', chatMessage.message, user);
        removeActiveUser(socket.id); // Remover usuario activo
        namespace.to(chatRoomId).emit('userList', activeUsers, chatRoomId);
        socket.leave(chatRoomId);
    });

    socket.on('chatMessage', (chatRoomId, message, user) => {
        const { email } = user;
        const chatMessage = {
            message,
            userId: socket.id,
            email,
            date: new Date(),
        };
        console.log(chatMessage);
        pushMessages(chatRoomId, chatMessage.message, socket?.id, email);
        namespace.to(chatRoomId).emit('chatMessage', message, user);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from chat namespace');
        const user = activeUsers[socket.id];
        if (user) {
            const chatRoomId = user.roomId;
            const chatMessage = {
                message: `User left chat room `,
                userId: socket.id,
                date: new Date(),
            };
            pushMessages(
                chatRoomId,
                chatMessage.message,
                socket.id,
                user.email,
            );
            namespace
                .to(chatRoomId)
                .emit('chatMessage', chatMessage.message, user);
            removeActiveUser(socket.id);
            namespace.to(chatRoomId).emit('userList', activeUsers, chatRoomId);
            console.log(`User left chat room ${chatRoomId}`);
            socket.leave(chatRoomId);
        }
    });

    socket.on('error', (error) => {
        console.error('Chat namespace socket error:', error);
    });
};
