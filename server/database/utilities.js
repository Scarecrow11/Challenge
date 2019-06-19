import { tryParseInt } from '../utilities/utilities';

const checkID = (req, res, next) => (tryParseInt(req.params.id, false)) ? next()
    : res.send({ status: false, data: 'Wrong option', error: 'Got type error in options' })


export { checkID };