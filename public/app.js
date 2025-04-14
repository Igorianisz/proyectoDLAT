const socket = io('/chat');

const loginContainer = document.getElementById('loginContainer');
const chatContainer = document.getElementById('chatContainer');

const nameUser = document.getElementById('nameUser');
const lastNameUser = document.getElementById('lastNameUser');
const emailUser = document.getElementById('emailUser');
const passwordUser = document.getElementById('passwordUser');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const logoutButton = document.getElementById('logoutButton');
const toggleFormButton = document.getElementById('toggleFormButton');
const formTitle = document.getElementById('formTitle');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usersDiv = document.getElementById('users');
const roomsList = document.getElementById('roomsList');
const chatRoomName = document.getElementById('chatRoomName');
const userOnCurrentChat = document.getElementById('userOnCurrentChat');
const chatMessages = document.getElementById('chatMessages');

let email = '';
let currentRoom = '';
let isRegistering = false;

const apiUrl = '/api/v1/auth';

const handleLogin = async () => {
    const emailLogin = emailUser.value;
    const passwordLogin = passwordUser.value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailLogin,
                password: passwordLogin,
            }),
        });

        if (response.ok) {
            // const data = await response.json();
            email = emailLogin;
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'block';
        } else {
            // display an alert message on the html, saying that the login failed
            alert('Login failed. Please check your credentials and try again.');

            console.error('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleRegister = async () => {
    const name = nameUser.value;
    const lastName = lastNameUser.value;
    const emailLogin = emailUser.value;
    const passwordLogin = passwordUser.value;

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                last_name: lastName,
                email: emailLogin,
                password: passwordLogin,
                role: 'Dev',
            }),
        });

        if (response.ok) {
            // const data = await response.json();
            email = emailLogin;
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'block';
        } else {
            alert(
                'Registration failed. Please check your credentials and try again.',
            );
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleLogout = () => {
    socket.emit('leaveChatRoom', currentRoom, { email });
    currentRoom = '';
    email = '';
    chatRoomName.textContent = 'No Room';
    chatContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    roomsList.value = '';
    messagesDiv.innerHTML = '';
};

const handleRoomChange = () => {
    const newRoom = roomsList.value;
    if (currentRoom) {
        socket.emit('leaveChatRoom', currentRoom, { email });
    }
    currentRoom = newRoom;
    chatRoomName.textContent = currentRoom;
    socket.emit('joinChatRoom', currentRoom, {
        email,
    });
    messagesDiv.innerHTML = '';
    chatMessages.style.display = 'block';
};

socket.on('previousMessages', (messages) => {
    console.log(messages);
    messages.forEach((messageData) => {
        const { message, userId, date, email } = messageData;
        const messageElement = document.createElement('li');
        messageElement.classList.add('previous-message'); // Agregar clase CSS
        messageElement.innerHTML = `<strong>${email}</strong>: ${message} (${new Date(
            date,
        ).toLocaleString()})`;
        messagesDiv.appendChild(messageElement);
    });
});

const toggleForm = () => {
    isRegistering = !isRegistering;
    if (isRegistering) {
        formTitle.textContent = 'Register';
        nameUser.style.display = 'block';
        lastNameUser.style.display = 'block';
        loginButton.style.display = 'none';
        registerButton.style.display = 'block';
        toggleFormButton.textContent = 'Switch to Login';
    } else {
        formTitle.textContent = 'Login';
        nameUser.style.display = 'none';
        lastNameUser.style.display = 'none';
        loginButton.style.display = 'block';
        registerButton.style.display = 'none';
        toggleFormButton.textContent = 'Switch to Register';
    }
};

loginButton.addEventListener('click', handleLogin);
registerButton.addEventListener('click', handleRegister);
logoutButton.addEventListener('click', handleLogout);
roomsList.addEventListener('change', handleRoomChange);
toggleFormButton.addEventListener('click', toggleForm);

socket.on('chatMessage', (message, user) => {
    const { email } = user;
    const messageElement = document.createElement('li');
    messageElement.textContent = `${email}: ${message} (${new Date().toLocaleString()})`;
    messagesDiv.appendChild(messageElement);
    console.log(message, user);
});

socket.on('userList', (users) => {
    console.log('lista usuyarios', users);
    userOnCurrentChat.innerHTML = '';
    Object.values(users)?.forEach((user) => {
        if (user.roomId === currentRoom) {
            const userElement = document.createElement('li');
            userElement.textContent = user.email;
            userOnCurrentChat.appendChild(userElement);
        }
    });
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message === '') {
        return;
    }
    if (currentRoom) {
        socket.emit('chatMessage', currentRoom, message, {
            email,
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
