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

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/peerjs', peerServer);

peerServer.on('connection', peer => {
  console.log("Peer connected", peer.id);
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
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('endCall', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
    socket.emit('callEnded');
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}...`));
