import socketIo from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { ioConnection } from './socket';
import { router } from '../config/router';
import { config } from '../config/main';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const { port } = config.serverDef;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/', router);

// event fired every time a new client connects:
io.on('connection', ioConnection);

server.listen(port);

console.log('server start on port', port);
