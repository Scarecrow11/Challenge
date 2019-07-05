import express from 'express';
import { checkAuth } from '../middleware/authAndId';
import { insert, update, del } from '../controllers/exchange_histories';

const histories = express.Router();

histories.post('/', checkAuth, insert)

histories.put('/:id', checkAuth, update);

histories.delete('/:id', checkAuth, del);

export { histories };