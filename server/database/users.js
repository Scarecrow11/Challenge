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

export { users };