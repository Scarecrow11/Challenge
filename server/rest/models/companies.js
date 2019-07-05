import { connection } from './connection';

const getCompanies = () => new Promise((result, reject) =>
    connection.query({
        sql: `SELECT id, name 
        FROM company;`
    }, (error, results, fields) => (error) ? reject(error) : result(results)));

const GetHistories = (companyId) => new Promise((result, reject) =>
    connection.query({
        sql: `SELECT u.id as user_id, u.name as username, ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at 
        FROM exchange_history as eh 
        INNER JOIN available_currency as ac ON eh.base_id=ac.id 
        INNER JOIN available_currency as ac2 ON eh.desired_id=ac2.id 
        INNER JOIN users as u ON eh.user_id=u.id 
        WHERE delete_at is null AND u.company_id= ? ;`,
        values: [companyId]
    }, (error, results, fields) => (error) ? reject(error) : result(results)));

const getHistoriesCount = (companyId) => new Promise((result, reject) =>
    connection.query({
        sql: `SELECT count(*) as count 
        FROM exchange_history as eh 
        INNER JOIN users as u ON eh.user_id=u.id 
        WHERE delete_at is null AND u.company_id= ? ;`,
        values: [companyId]
    }, (error, results, fields) => (error) ? reject(error) : result(results)));

export { getCompanies, getHistoriesCount, GetHistories };