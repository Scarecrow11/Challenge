import express from 'express';
import { connection, responseDB } from '../database/connection';
const company = express.Router();

company.get('/', (req, res) => {
    connection.query({
        sql: `SELECT id, name 
        FROM company;`
    }, (error, results, fields) => res.send(responseDB(error, results)))
});

export { company }