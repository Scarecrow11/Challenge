import express from 'express';
import { typeAuth, tokens } from '../config/main';
import { connection, responseDB } from '../database/connection';
const currency = express.Router();

const nonAutorized = (req, res) => {
 connection.query({
        sql: `SELECT * 
        FROM available_currency 
        LIMIT 2;`
    }, (error, results, fields) =>  res.send(responseDB(error, results)));
}

const checkAuth = (req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : nonAutorized(req, res);
};

currency.get('/', checkAuth, (req, res) => {
    connection.query({
        sql: `SELECT * 
        FROM available_currency;`
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { currency };