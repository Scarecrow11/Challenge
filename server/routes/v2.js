import express from 'express';
import { histories } from '../database/histories';
import { users } from '../database/users';
import { companies } from '../database/companies';
import { currencies } from '../database/currencies';

const v2 = express.Router();

v2.use('/companies', companies);

v2.use('/currencies', currencies);

v2.use('/users', users);

v2.use('/histories', histories);

export { v2 };