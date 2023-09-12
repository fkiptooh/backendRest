import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['BACKEND-REST-API']
        const existingUser =  getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.status(404).json({
                status: 403,
                message: existingUser
            });
        }
        if (!sessionToken) {
            return res.sendStatus(403);
        }
       

        merge(req, { identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}