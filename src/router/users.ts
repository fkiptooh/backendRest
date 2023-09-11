import express from 'express';

import { getAllUsers } from '../controller/users';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
}