import { currencies, tokens, typeAuth } from '../config/main';

const autorized = (req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : res.send(currencies.nonAutorized)
};

export { autorized };