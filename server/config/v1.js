import express from 'express';
import { currencies, tokens, typeAuth } from './main';
const v1 = express.Router();

v1.use('/',(req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : res.send(currencies.nonAutorized)
});

v1.get('/currencies', (req, res) => {
    res.send(currencies.autorized);
});

export { v1 };