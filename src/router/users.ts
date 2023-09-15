import express from 'express';

import { deleteUser, getAllUsers } from '../controller/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
}