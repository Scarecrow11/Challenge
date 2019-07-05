import request from 'request-promise';
import { rateApi }from '../../config/main';

// function for set responce for client
const getCurrency = (data, amount) => (data.success) ?
    {
        status: data.success,
        data: data.ticker.price * amount
    } : {
        status: data.success,
        data: 'Error in get exchange rates, try latter',
        error: data.error
    }

// get currency exchange rates 
const convert = (baseCurrency, desiredCurrency, amount) => {
    let options = {
        method: 'GET',
        uri: rateApi + baseCurrency + '-' + desiredCurrency,
        json: true
    };

    return request(options)
        .then((res) => getCurrency(res, amount))
        .catch((err) => getCurrency(err, amount));
};

export { convert };