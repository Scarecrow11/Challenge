import express from 'express';
import { connection, responseDB, updateResDB } from './connection';
import { tryParseFloat, tryParseInt } from '../utilities/utilities';
import { checkCompanyID, checkUserID } from './utilities';

const history = express.Router();

history.get('/users/:userId', checkUserID, (req, res) => {
    connection.query({
        sql: [
            'SELECT ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at',
            'FROM test2.exchange_history as eh',
            'INNER JOIN available_currency as ac ON eh.base_id=ac.id',
            'INNER JOIN available_currency as ac2 on eh.desired_id = ac2.id',
            'WHERE eh.user_id= ? and delete_at is null;'
        ].join(' '),
        values: [req.params.userId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

history.get('/users/count/:userId', checkUserID, (req, res) => {
    connection.query({
        sql: [
            'SELECT count(*) as count',
            'FROM test2.exchange_history',
            'WHERE user_id= ? and delete_at is null'
        ].join(' '),
        values: [req.params.userId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

history.get('/companies/:companyId', checkCompanyID, (req, res) => {
    connection.query({
        sql: [
            'SELECT u.id as user_id, u.name as username, ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at',
            'FROM test2.exchange_history as eh',
            'INNER JOIN available_currency as ac ON eh.base_id=ac.id',
            'INNER JOIN available_currency as ac2 ON eh.desired_id=ac2.id',
            'INNER JOIN users as u ON eh.user_id=u.id',
            'WHERE u.company_id= ? and delete_at is null;'
        ].join(' '),
        values: [req.params.companyId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

history.get('/companies/count/:companyId', checkCompanyID, (req, res) => {
    connection.query({
        sql: [
            'SELECT count(*) as count',
            'FROM test2.exchange_history as eh',
            'INNER JOIN users as u ON eh.user_id=u.id',
            'WHERE u.company_id= ? and delete_at is null;'
        ].join(' '),
        values: [req.params.companyId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

history.post('/', (req, res) => {
    const { userId, baseCurrencyId, desiredCurrencyId, amount, rate } = req.body;

    if (tryParseInt(userId, false) && tryParseInt(baseCurrencyId, false) && tryParseInt(desiredCurrencyId, false) && tryParseFloat(amount, false) && tryParseFloat(rate, false)) {

        connection.query({
            sql: [
                'INSERT INTO exchange_history (user_id, base_id, desired_id, amount, rate, created_at)',
                'VALUE (?, ?, ?, ?, ?, now());'
            ].join(' '),
            values: [userId, baseCurrencyId, desiredCurrencyId, amount, rate]
        }, (error, results, fields) => res.send(responseDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
})

history.put('/', (req, res) => {
    const { id, amount } = req.body;
    if (tryParseInt(id, false) && tryParseFloat(amount, false)) {

        connection.query({
            sql: [
                'UPDATE exchange_history',
                'SET amount=?, update_at=now()',
                'WHERE id=?;'
            ].join(' '),
            values: [amount, id]
        }, (error, results, fields) => res.send(updateResDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

history.delete('/', (req, res) => {
    if (tryParseInt(req.body.id, false)) {
        connection.query({
            sql: [
                'UPDATE exchange_history',
                'SET delete_at=now()',
                'WHERE id=?;'
            ].join(' '),
            values: [req.body.id]
        }, (error, results, fields) => res.send(updateResDB(error, results)));
    } else {
        res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
    }
});

export { history };