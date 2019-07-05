import http from 'http';
import cors from 'cors';
import express from 'express';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import { config } from '../config/main';
import { ioConnection } from './socket';
import { router } from '../rest/routes/router';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const { port } = config.serverDef;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', router);

// event fired every time a new client connects:
io.on('connection', ioConnection);

server.listen(port);

console.log('server start on port', port);
