import express from 'express';
import { checkAuth } from '../utils/utilities';
import { allCurrencies } from '../controllers/currencies';

const currencies = express.Router();

currencies.get('/', checkAuth, allCurrencies);

export { currencies };