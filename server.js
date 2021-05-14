const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
const port = process.env.PORT || 3050;
const server = require ('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*' }});
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server,
    {
        path: '/'
    }
);
const { Session, User } = require('./db');

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/peerjs', peerServer);

peerServer.on('connection', peer => {
    console.log("Peer connected", peer.id)
});

const users = {};
const socketToRoom = {};

io.on('connection', socket => {
  socket.on("join room", roomID => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      console.log("SOCKET2: ", socket.id)
      users[roomID].push(socket.id);
    } else {
      console.log("FIRST SOCKET: ", socket.id)
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    console.log("SENDING SIGNAL:", payload.callerID)
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    console.log("RETURNING SIGNAL: ", payload.userToSignal, " FROM: " , payload.callerID)
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    console.log("DISCONNECTING")
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}...`));
// app.listen(port, () => console.log(`Server listening on port ${port}...`));