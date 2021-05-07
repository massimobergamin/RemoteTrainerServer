const express = require('express');
const server = express();
const router = require('./router');
const cors = require('cors')
const port = 3050;

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(port, () => console.log(`Server listening on port ${port}...`));