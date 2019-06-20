import express from 'express';
import { connection, responseDB } from '../database/connection';
import { checkID, checkAuth } from './utilities';
const users = express.Router();

users.get('/:id', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT * 
        FROM users 
        WHERE company_id = ? ;`,
        values: [req.params.companyId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

users.get('/:id/histories', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at 
        FROM exchange_history as eh 
        INNER JOIN available_currency as ac ON eh.base_id=ac.id 
        INNER JOIN available_currency as ac2 on eh.desired_id = ac2.id 
        WHERE eh.user_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

users.get('/:id/histories/count', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT count(*) as count 
        FROM exchange_history 
        WHERE user_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { users };