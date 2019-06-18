import mysql from 'mysql';
import { config } from '../config/main';

const { database, user, password, host } = config.serverDB;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

export { connection }