import { currencies } from '../config/main';

const getCurrencies = (req, res) =>
    res.send(currencies.autorized);

export { getCurrencies };