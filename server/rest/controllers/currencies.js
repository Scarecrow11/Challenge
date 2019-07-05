import { getCurrencies } from '../models/currencies';

const allCurrencies = (req, res) =>
    getCurrencies()
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

export { allCurrencies };