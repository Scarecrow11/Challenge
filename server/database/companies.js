import express from 'express';
import { connection, responseDB } from './connection';
import { checkAuth, checkID } from '../utilities/utilities';

const companies = express.Router();

companies.get('/', (req, res) => {
    connection.query({
        sql: `SELECT id, name 
        FROM company;`
    }, (error, results, fields) => res.send(responseDB(error, results)))
});

companies.get('/:id/histories', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT u.id as user_id, u.name as username, ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at 
        FROM exchange_history as eh 
        INNER JOIN available_currency as ac ON eh.base_id=ac.id 
        INNER JOIN available_currency as ac2 ON eh.desired_id=ac2.id 
        INNER JOIN users as u ON eh.user_id=u.id 
        WHERE u.company_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

companies.get('/:id/histories/count', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT count(*) as count 
        FROM exchange_history as eh 
        INNER JOIN users as u ON eh.user_id=u.id 
        WHERE u.company_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { companies }