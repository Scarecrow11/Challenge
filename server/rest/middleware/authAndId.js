import { tokens, typeAuth } from '../../config/main';
import { tryParseInt } from '../utils/parsers';

const checkID = (req, res, next) => (tryParseInt(req.params.id)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });

const checkAuth = (req, res, next) => {
    let type, token;
    [type, token] = req.headers.authorization.split(' ');
    (type === typeAuth && tokens.includes(token)) ? next()
        : res.send({ status: false, data: 'Error in load date', error: 'Error in authorization token' });
};

export { checkID, checkAuth };