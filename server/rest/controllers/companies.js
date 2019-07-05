import { getCompanies, getHistoriesCount, GetHistories } from '../models/companies';

const companies = (req, res) =>
    getCompanies()
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

const histories = (req, res) =>
    GetHistories(req.params.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

const historiesCount = (req, res) =>
    getHistoriesCount(req.params.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

export { companies, histories, historiesCount }