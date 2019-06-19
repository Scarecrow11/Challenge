import express from 'express';
import { tryParseInt } from '../utilities/utilities';
import { connection, responseDB } from '../database/connection';
import { checkCompanyID } from './utilities';
const users = express.Router();

users.get('/:companyId', checkCompanyID, (req, res) => {
        connection.query({
            sql: [
                'SELECT *',
                'FROM test2.users',
                'WHERE company_id = ? ;'
            ].join(' '),
            values: [req.params.companyId]
        }, (error, results, fields) => res.send(responseDB(error, results)));
});

export { users };