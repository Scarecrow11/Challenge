import express from 'express';
import { connection } from '../database/connection';
const company = express.Router();

company.get('/', (req, res) => {
     
    connection.query({
        sql: 'SELECT id, name FROM test2.company;'
    }, (error, results, fields) => (error)
        ? res.send({ status: false, data: 'Error in query', error: error })
        : res.send({ status: true, data: results }));
});

export { company }