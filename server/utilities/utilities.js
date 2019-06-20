import { tokens, typeAuth } from '../config/main'

// function for check string
const tryParseFloat = (str, defaultValue) => (new Boolean(str)) ? parseFloat(str) : defaultValue;

const tryParseInt= (str, defaultValue) => (new Boolean(str)) ? parseInt(str) : defaultValue;

const checkID = (req, res, next) => (tryParseInt(req.params.id, false)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' })

const checkAuth = (req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : res.send({ status: false, data: 'Error in load date', error: 'Error in authorization token' });
};

export { tryParseInt, tryParseFloat, checkID, checkAuth };