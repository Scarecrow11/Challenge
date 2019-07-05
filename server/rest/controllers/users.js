import { getCountUsersHist, getUsersExchangeHist, getUsersFromComp } from '../models/users';

const getCountUsersHistory = (req, res) =>
    getCountUsersHist(req.params.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }))

const getUsersExchangeHistory = (req, res) =>
    getUsersExchangeHist(req.params.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }))

const getUsersFromCompany = (req, res) =>
    getUsersFromComp(req.params.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }))

export { getUsersExchangeHistory, getUsersFromCompany, getCountUsersHistory }