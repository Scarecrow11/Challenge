import { convert } from '../convert/convert';
import { parseFloat } from '../utilities/main';

const ioConnection = (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    // when socket disconnects, remove it from the list:
    socket.on('disconnect', () => {
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on('convert', (baseCurrency, desiredCurrency, amount) => {
        let isNumber = parseFloat(amount);
        if (isNumber) {
            socket.emit('convert_res', { status: true, data: 'Please wait, check exchange rates' });
            convert(baseCurrency, desiredCurrency, isNumber).then(response =>
                socket.emit('convert_res', response));
        } else {
            socket.emit('convert_res', { status: false, data: 'Got error, value is not number', error: 'Exception: variable has non-numeric type' });
        }
    });

    socket.emit('info', socket.id);
}

export { ioConnection };