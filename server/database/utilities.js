import { tryParseInt } from '../utilities/utilities';

const checkUserID = (req, res, next) => (tryParseInt(req.params.userId, false)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });

const checkCompanyID = (req, res, next) => (tryParseInt(req.params.companyId, false)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' });

export { checkUserID, checkCompanyID };