import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner =async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity.id') as string;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

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