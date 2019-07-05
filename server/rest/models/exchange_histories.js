import { connection } from '../models/connection';
import { tryParseFloat, tryParseInt } from '../utils/utilities';

const addHist = (userId, baseCurrencyId, desiredCurrencyId, amount, rate) => new Promise((result, reject) =>
    (!tryParseInt(userId) && !tryParseInt(baseCurrencyId) && !tryParseInt(desiredCurrencyId) && !tryParseFloat(amount) && !tryParseFloat(rate))
        ? reject('Got type error in options')
        : connection.query({
            sql: `INSERT INTO exchange_history (user_id, base_id, desired_id, amount, rate, created_at) 
            VALUE (?, ?, ?, ?, ?, now());`,
            values: [userId, baseCurrencyId, desiredCurrencyId, amount, rate]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

const changeHist = (id, amount) => new Promise((result, reject) =>
    (!tryParseInt(id) && !tryParseFloat(amount))
        ? reject('Got type error in options')
        : connection.query({
            sql: `UPDATE exchange_history 
            SET update_at= now(), amount= ? 
            WHERE delete_at is null AND id = ?;`,
            values: [amount, id]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

const deleteHist = (id) => new Promise((result, reject) =>
    (!tryParseInt(id))
        ? reject('Got type error in options')
        : connection.query({
            sql: `UPDATE exchange_history 
            SET delete_at=now() 
            WHERE delete_at is null AND id= ?;`,
            values: [id]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

export { addHist, changeHist, deleteHist };

