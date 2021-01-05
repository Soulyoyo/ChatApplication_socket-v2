//Node Server which will handle socket io connections

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    //If new User joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{
        // console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    
    //If someone sends the message broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //If someone leaves the chat, let other know
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left-the-chat', users[socket.id]);
        delete users[socket.id];
    });
})
