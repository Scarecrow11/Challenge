import express from 'express';
import { connection, responseDB } from './connection';
import { checkAuth, checkID } from '../utilities/main';

const companies = express.Router();

companies.get('/', (req, res) => {
    connection.query({
        sql: `SELECT id, name 
        FROM companies;`
    }, (error, results, fields) => res.send(responseDB(error, results)))
});

companies.get('/:id/histories', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT u.id as user_id, u.name as username, base.name as base, des.name as desired, h.rate, h.amount, created_at 
        FROM histories as h 
        INNER JOIN currencies as base ON h.base_id=base.id 
        INNER JOIN currencies as des ON h.desired_id=des.id 
        INNER JOIN users as u ON h.user_id=u.id 
        WHERE u.companies_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

companies.get('/:id/histories/count', [checkAuth, checkID], (req, res) => {
    connection.query({
        sql: `SELECT count(*) as count 
        FROM histories as h 
        INNER JOIN users as u ON h.user_id=u.id 
        WHERE u.companies_id= ? and delete_at is null;`,
        values: [req.params.id]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { companies }