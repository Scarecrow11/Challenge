import { tokens, typeAuth } from '../config/main'

// function for check string
const parseFloat = (str) => (new Boolean(str)) ? parseFloat(str) : false;

const parseInt= (str) => (new Boolean(str)) ? parseInt(str) : false;

const checkID = (req, res, next) => (parseInt(req.params.id)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' })

const checkAuth = (req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next() : res.send({ status: false, data: 'Error in load date', error: 'Error in authorization token' });
};

export { parseInt, parseFloat, checkID, checkAuth };