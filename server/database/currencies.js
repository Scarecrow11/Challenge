import express from 'express';
import { connection, responseDB } from './connection';
import { checkAuth } from '../utilities/utilities';
const currencies = express.Router();

currencies.get('/', checkAuth, (req, res) => {
    connection.query({
        sql: `SELECT * 
        FROM available_currency;`
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { currencies };