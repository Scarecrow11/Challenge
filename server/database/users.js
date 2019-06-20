import express from 'express';
import { connection, responseDB } from '../database/connection';
import { checkID, checkAuth } from '../utilities/main';

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
        sql: `SELECT ac.name as base, ac2.name as desired, h.rate as rate, h.amount as amount, created_at 
        FROM exchange_history as h 
        INNER JOIN available_currency as ac ON h.base_id=ac.id 
        INNER JOIN available_currency as ac2 on h.desired_id = ac2.id 
        WHERE h.user_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

users.get('/:id/histories/count', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT count(*) as count 
        FROM histories 
        WHERE user_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

users.get('/histories/last', checkAuth, (req, res)=> {
    connection.query({
        sql: `SELECT com.name, u.name, base.name as base, des.name as desired, h.rate, h.amount, max(h.created_at) as created_at
        FROM histories as h
        INNER JOIN users as u ON h.user_id = u.id
        INNER JOIN currencies as base ON h.base_id = base.id
        INNER JOIN currencies as des ON h.desired_id = des.id
        INNER JOIN companies as com ON u.companies_id= com.id
        WHERE h.delete_at is null 
        GROUP BY u.name`,
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { users };