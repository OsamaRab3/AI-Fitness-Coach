
// ____________________________________________________________________________________________________________
// ______________________________________Osama Rabea Dakrory__________________________________________________
// ____________________________________________________________________________________________________________

const app = require('./app')
const http = require('http')
const config = require('./config/index')
const socketio = require('socket.io');
const server = http.createServer(app)
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
      origin: "*",  
      methods: ["GET", "POST"],
      credentials: true
    }
  });

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
       const { userId } = socket.handshake.query;;

    if (userId) {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} connected to room: user_${userId}`);
    }
  
    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
    });
});


app.set('io',io)




server.listen(config.PORT,()=>{
    console.log(`Server running on http://localhost:${config.PORT}`);
});