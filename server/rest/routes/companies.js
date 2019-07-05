import express from 'express';
import { checkAuth, checkID } from '../middleware/authAndId';
import { companies, histories, historiesCount } from '../controllers/companies';

const companies = express.Router();

companies.get('/', companies);

companies.get('/:id/histories', [checkAuth, checkID], histories);

companies.get('/:id/histories/count', [checkAuth, checkID], historiesCount);

export { companies }