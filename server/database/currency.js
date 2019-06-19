import express from 'express';
import { connection, responseDB } from '../database/connection';
import { checkAuth } from './utilities';
const currency = express.Router();

currency.get('/', checkAuth, (req, res) => {
    connection.query({
        sql: `SELECT * 
        FROM available_currency;`
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { currency };