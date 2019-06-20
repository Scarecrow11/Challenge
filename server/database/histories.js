import express from 'express';
import { connection, responseDB } from './connection';
import { parseFloat, parseInt, checkAuth } from '../utilities/main';

const histories = express.Router();

histories.get('/total/:base_id/:des_id', checkAuth, (req, res) => {
    if (parseInt(req.params.base_id) && parseInt(req.params.base_id)) {
        connection.query({
            sql: `SELECT sum(total) as total
                FROM histories
                WHERE base_id = ? and desired_id = ?`,
            values: [req.params.base_id, req.params.base_id]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
})

histories.post('/', checkAuth, (req, res) => {
    const { userId, baseCurrencyId, desiredCurrencyId, amount, rate } = req.body;

    if (parseInt(userId) && parseInt(baseCurrencyId) && parseInt(desiredCurrencyId) && parseFloat(amount) && parseFloat(rate) && parseFloat(total)) {

        connection.query({
            sql: `INSERT INTO histories (user_id, base_id, desired_id, amount, rate, total, created_at) 
                VALUE (?, ?, ?, ?, ?, now());`,
            values: [userId, baseCurrencyId, desiredCurrencyId, amount, rate, total]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
})

histories.put('/:id', checkAuth, (req, res) => {
    const { id, amount } = req.body;
    if (parseInt(id) && parseFloat(amount)) {

        connection.query({
            sql: `UPDATE histories 
                SET amount=?, update_at=now() 
                WHERE id=? and delete_at is null;`,
            values: [amount, id]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

histories.delete('/:id', checkAuth, (req, res) => {
    if (parseInt(req.body.id)) {
        connection.query({
            sql: `UPDATE histories 
                SET delete_at=now() 
                WHERE id=? and delete_at is null;`,
            values: [req.body.id]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

export { histories };