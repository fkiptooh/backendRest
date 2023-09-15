import express from 'express';

import { get, identity, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        console.log(id)
        const currentUserId = get(req, 'identity_id') as string;
        console.log(currentUserId);

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.status(200).json({
                status:403,
                message: 'Unauthorized'
            });
        }
        return next();
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