import { connection } from '../database/connection';

const getCountUsersHist = (userId) => new Promise((result, reject) =>
    (!userId) ? reject('User id is empty')
        : connection.query({
            sql: `SELECT count(*) as count 
            FROM exchange_history 
            WHERE user_id= ? and delete_at is null;`,
            values: [userId]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

const getUsersExchangeHist = (userId) => new Promise((result, reject) =>
    (!usersId) ? reject('User id is empty')
        : connection.query({
            sql: `SELECT ac.name as base, ac2.name as desired, eh.rate as rate, eh.amount as amount, created_at 
            FROM exchange_history as eh 
            INNER JOIN available_currency as ac ON eh.base_id=ac.id 
            INNER JOIN available_currency as ac2 on eh.desired_id = ac2.id 
            WHERE delete_at is null AND eh.user_id= ?;`,
            values: [userId]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

const getUsersFromComp = (companyId) => new Promise((result, reject) =>
    (!usersId) ? reject('User id is empty')
        : connection.query({
            sql: `SELECT * 
            FROM users 
            WHERE company_id = ? ;`,
            values: [companyId]
        }, (error, results, fields) => (error) ? reject(error) : result(results)));

export { getCountUsersHist, getUsersExchangeHist, getUsersFromComp };