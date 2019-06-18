import express from 'express';
import { connection } from './connection';
import { tryParseFloat, tryParseInt } from '../utilities/utilities'
const history = express.Router();

history.route('/')
    .get((req, res) => {
        const userId = tryParseInt(req.query.userId, false);
        const companyId = tryParseInt(req.query.companyId, false);
        if (userId) {
            if (!req.query.count) {
                 
                // select all user history
                connection.query({
                    sql: 'SELECT ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at FROM test2.exchange_history as eh inner join available_currency as ac on eh.base_id=ac.id inner join available_currency as ac2 on eh.desired_id = ac2.id where eh.user_id= ? and delete_at is null;',
                    values: [userId]
                }, (error, results, fields) => (error)
                    ? res.send({ status: false, data: 'Error in query', error: error })
                    : res.send({ status: true, data: results })
                );
                
            } else {
                 
                connection.query({
                    sql: 'SELECT count(*) as count FROM test2.exchange_history where user_id=? and delete_at is null;',
                    values: [userId]
                }, (error, results, fields) => (error)
                    ? res.send({ status: false, data: 'Error in query', error: error })
                    : res.send({ status: true, data: results })
                );
                
            }
        } else if (companyId) {
            if (!req.query.count) {
                 
                // select all company history
                connection.query({
                    sql: 'SELECT u.id as user_id, u.name as username, ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at FROM test2.exchange_history as eh inner join available_currency as ac on eh.base_id=ac.id inner join available_currency as ac2 on eh.desired_id=ac2.id inner join users as u on eh.user_id=u.id where u.company_id= ? and delete_at is null;',
                    values: [companyId]
                }, (error, results, fields) => (error)
                    ? res.send({ status: false, data: 'Error in query', error: error })
                    : res.send({ status: true, data: results })
                );
                
            } else {
                 
                // select all company history
                connection.query({
                    sql: 'SELECT count(*) as count FROM test2.exchange_history as eh inner join users as u on eh.user_id=u.id where u.company_id= ? and delete_at is null;',
                    values: [companyId]
                }, (error, results, fields) => (error)
                    ? res.send({ status: false, data: 'Error in query', error: error })
                    : res.send({ status: true, data: results })
                );
                  
            }
        } else {
            res.send({ status: false, data: 'Wrong option', error: 'Wront type of options' });
        }
    })
    .post((req, res) => {
        const { userId, baseCurrencyId, desiredCurrencyId, amount, rate } = req.body;

        if (tryParseInt(userId,false) && tryParseInt(baseCurrencyId,false) && tryParseInt(desiredCurrencyId,false) && tryParseFloat(amount,false) && tryParseFloat(rate,false)) {
             
            connection.query({
                sql: 'insert into exchange_history (user_id, base_id, desired_id, amount, rate, created_at) value (?, ?, ?, ?, ?, now());',
                values: [userId, baseCurrencyId, desiredCurrencyId, amount, rate]
            }, (error, results, fields) => (error)
                ? res.send({ status: false, data: 'Error in query', error: error })
                : res.send({ status: true, data: results })
            );
            
        } else {
            res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
        }
    })
    .put((req, res) => {
        const { id, amount } = req.body;

        if (tryParseInt(id,false) && tryParseFloat(amount,false)) {
             
            connection.query({
                sql: 'update exchange_history set amount=?, update_at=now() where id=?;',
                values: [amount, id]
            }, (error, results, fields) => (error)
                ? res.send({ status: false, data: 'Error in query', error: error })
                : res.send({ status: true, data: results }));
            
        } else {
            res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
        }
    })
    .delete((req, res) => {
        if (tryParseInt(req.body.id,false)) {
             
            connection.query({
                sql: 'update exchange_history set delete_at=now() where id=?;',
                values: [req.body.id]
            }, (error, results, fields) => (error)
                ? res.send({ status: false, data: 'Error in query', error: error })
                : res.send({ status: true, data: results }));
            
        } else {
            res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });
        }
    });

export { history };