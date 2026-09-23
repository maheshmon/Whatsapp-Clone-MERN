import {Server} from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = [];

const addUser = (userData, socketId) => {
    const existingIndex = users.findIndex(user => user.sub === userData.sub);
    if (existingIndex !== -1) {
        users[existingIndex].socketId = socketId;
    } else {
        users.push({ ...userData, socketId });
    }
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket)=>{
    console.log('user connected:', socket.id);
    socket.on("addUsers", userData => {
        if (userData && userData.sub) {
            addUser(userData, socket.id);
            io.emit("getUsers", users);
        }
    })

    socket.on('sendMessage', data=>{
        const user = getUser(data.receiverId);
        if (user && user.socketId) {
            io.to(user.socketId).emit('getMessage', data);
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    })
})