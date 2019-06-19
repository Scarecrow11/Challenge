import express from 'express';
import { connection, responseDB } from '../database/connection';
import { checkCompanyID } from './utilities';
const users = express.Router();

users.get('/:companyId', checkCompanyID, (req, res) => {
    connection.query({
        sql: `SELECT * 
        FROM users 
        WHERE company_id = ? ;`,
        values: [req.params.companyId]
    }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { users };