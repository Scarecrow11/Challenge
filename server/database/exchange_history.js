import express from 'express';
import { connection, responseDB, updateResDB } from './connection';
import { tryParseFloat, tryParseInt, checkAuth } from '../utilities/utilities';

const histories = express.Router();

histories.post('/', checkAuth, (req, res) => {
    const { userId, baseCurrencyId, desiredCurrencyId, amount, rate } = req.body;

    if (tryParseInt(userId, false) && tryParseInt(baseCurrencyId, false) && tryParseInt(desiredCurrencyId, false) && tryParseFloat(amount, false) && tryParseFloat(rate, false)) {

        connection.query({
            sql: `INSERT INTO exchange_history (user_id, base_id, desired_id, amount, rate, created_at) 
            VALUE (?, ?, ?, ?, ?, now());`,
            values: [userId, baseCurrencyId, desiredCurrencyId, amount, rate]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
})

histories.put('/:id', checkAuth, (req, res) => {
    const { id, amount } = req.body;
    if (tryParseInt(id, false) && tryParseFloat(amount, false)) {

        connection.query({
            sql: `UPDATE exchange_history 
            SET amount=?, update_at=now() 
            WHERE id=? and delete_at is null;`,
            values: [amount, id]
        }, (error, results, fields) => res.send(updateResDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

histories.delete('/:id', checkAuth, (req, res) => {
    if (tryParseInt(req.body.id, false)) {
        connection.query({
            sql: `UPDATE exchange_history 
            SET delete_at=now() 
            WHERE id=? and delete_at is null;`,
            values: [req.body.id]
        }, (error, results, fields) => res.send(updateResDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

export { histories };