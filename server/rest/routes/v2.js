import express from 'express';
import { users } from './users';
import { companies } from './companies';
import { currencies } from './currencies';
import { histories } from './exchange_history';

const v2 = express.Router();

v2.use('/users', users);

v2.use('/histories', histories);

v2.use('/companies', companies);

v2.use('/currencies', currencies);

export { v2 };