import express from 'express';
import { autorized } from '../middleware/v1';
import { getCurrencies } from '../controllers/v1';

const v1 = express.Router();

v1.use('/', autorized);

v1.get('/currencies', getCurrencies);

export { v1 };