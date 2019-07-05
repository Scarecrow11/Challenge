import { connection } from '../models/connection';

const getCurrencies = () => new Promise((result, reject) =>
    connection.query({
        sql: `SELECT * 
        FROM available_currency;`
    }, (error, results, fields) => (error) ? reject(error) : result(results)));

export { getCurrencies };    