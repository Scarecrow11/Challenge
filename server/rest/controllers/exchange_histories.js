import { addHist, changeHist, deleteHist } from '../models/exchange_histories';

const insert = (req, res) => {
    const { userId, baseCurrencyId, desiredCurrencyId, amount, rate } = req.body;
    addHist(userId, baseCurrencyId, desiredCurrencyId, amount, rate)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));
};

const update = (req, res) => {
    const { id, amount } = req.body;
    changeHist(id, amount)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));
};

const del = (req, res) =>
    deleteHist(req.body.id)
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

export { insert, update, del };