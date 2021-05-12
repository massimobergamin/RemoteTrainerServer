const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
const port = process.env.PORT || 3050;
const server = require ('http').Server(app);
const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server, 
{
    path: '/'
});
const { Session, User } = require('./db');

server.use(cors());
app.use(express.json());
app.use(router);
app.use('/peerjs', peerServer);

// peerServer.on('connection', peer => {
//     console.log("Peer connected", peer.id)
// });

// io.on('connection', socket => {
//     console.log('Connected to Client')
  
//     //listens for create new room given by sessionId from "START CALL" button on page session/:id
//     socket.on('createNewRoom', ({userId, sessionId, firstName}) => {
//         socket.join(sessionId); // joins room using sessionId as roomId
//         console.log("CREATED ROOM", userId, firstName)
//         // TODO: call db to add in_use flag with sessionId
//         Session.update({in_use: true}, {where:{id:sessionId}})
//         .then ( (res) => {
//             socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
//         })
//     });
  
//     //listens for a useEffect to check get sessionId row and send it back to page session/:id
//     socket.on('isRoomActive', ({userId, sessionId}, callback) => {
//         //TODO: call controller to get appointment row and send the whole row back
//         Session.findOne({where: {id:sessionId}})
//             .then(res => {
//                 callback(res)
//             })
//     });
  
//     //listens for join an existing room given by roomId from "JOIN CALL" button on page session/:id
//     socket.on('joinRoom', ({userId, firstName, sessionId}) => {
//         socket.join(sessionId)  //join existing room
//         let numClients = io.sockets.adapter.rooms.get(sessionId).size
//         //if (numClients <= 1) {
//             socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
//         //}
        
//         socket.on('disconnect', () => {
//             socket.broadcast.emit('user-disconnected', userId)
//         });
//     });
  
//     //listens for a disconnect
//     socket.on('hang-up', () => {
//         socket.broadcast.emit("Call Ended")
//     });
// });


// server.listen(port, () => console.log(`Server listening on port ${port}...`));
app.listen(port, () => console.log(`Server listening on port ${port}...`));