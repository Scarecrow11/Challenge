import express from 'express';
import { tryParseInt } from '../utilities/utilities';
import { connection } from '../database/connection';
const users = express.Router();

users.get('/', (req, res) => {
    if (tryParseInt(req.query.companyId, false)) {
         
        connection.query({
            sql: 'SELECT * FROM test2.users where company_id = ? ;',
            values: [req.query.companyId]
        }, (error, results, fields) => (error)
            ? res.send({ status: false, data: 'Error in query', error: error })
            : res.send({ status: true, data: results }));
        
    } else {
        res.send({ status: false, data: 'Error in request', error: 'Error - options id is undefined' });
    }
});

export { users };