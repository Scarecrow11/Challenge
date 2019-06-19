import mysql from 'mysql';
import { config } from '../config/main';

const { database, user, password, host } = config.serverDB;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

setTimeout(()=>connection.query(`select 1`),
5000);

const responseDB = (error, results) => (error) ? { status: false, data: 'Error in query', error: error } : { status: true, data: results };
const updateResDB = (error, results) => (error) ? { status: false, data: 'Error in query', error: error } : {};

export { connection, responseDB, updateResDB }