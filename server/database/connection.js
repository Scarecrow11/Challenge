import mysql from 'mysql';
import { config } from '../config/main';

const { database, user, password, host } = config.serverDB;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

const responseDB = (error, results) => (error) ? { status: false, data: 'Error in query', error: error } : { status: true, data: results };
const updateResDB = (error, results) => (error) ? { status: false, data: 'Error in query', error: error } : { status: true, data: {} };

export { connection, responseDB, updateResDB }