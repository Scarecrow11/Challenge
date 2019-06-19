import socketIo from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ioConnection } from './socket';
import { router } from '../routes/router';
import { config } from '../config/main';

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
