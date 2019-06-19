import express from 'express';
import { history } from '../database/exchange_history';
import { users } from '../database/users';
import { company } from '../database/company';
import { currency } from '../database/currency';

const v2 = express.Router();

v2.use('/companies', company);

v2.use('/currencies', currency);

v2.use('/users', users);

v2.use('/histories', history);

export { v2 };