import express from 'express';
import { checkID, checkAuth } from '../middleware/authAndId';
import { getUsersExchangeHistory, getUsersFromCompany, getCountUsersHistory } from '../controllers/users';

const users = express.Router();

users.get('/:id', [checkAuth, checkID], getUsersFromCompany);

users.get('/:id/histories', [checkAuth, checkID], getUsersExchangeHistory);

users.get('/:id/histories/count', [checkAuth, checkID], getCountUsersHistory);

export { users };