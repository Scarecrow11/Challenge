import express from 'express';
import { typeAuth, tokens } from '../config/main';
import { connection, responseDB } from '../database/connection';
const currency = express.Router();

const checkAuth = (req, res, next) =>{
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : res.redirect('/v2/currencies/nonAutorized');
};

currency.get('/', checkAuth, (req, res) => {
        connection.query({
            sql: [
                'SELECT *',
                'FROM test2.available_currency;'
            ].join(' ')
        }, (error, results, fields) => res.send(responseDB(error, results))
        );
});

currency.get('/nonAutorized', (req, res) => {
        connection.query({
            sql: [
                'SELECT *',
                'FROM test2.available_currency',
                'LIMIT 2;'
            ].join(' ')
        }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { currency };