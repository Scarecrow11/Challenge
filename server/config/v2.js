import express from 'express';
import { history } from '../database/exchange_history';
import { users } from '../database/users';
import { company } from '../database/company';

const v2 = express.Router();

v2.use('/company', company);

v2.use('/users', users)

v2.use('/history',history)

export { v2 };