import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { extendedRequest } from '../types/extendedRequest.js';


const validateJWT = (req: extendedRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('authorization');

    if (!authorizationHeader) {
        return res.status(403).send('Authorization header missing');
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send('Invalid token');
    }

    jwt.verify(token, "6a631cbe-6ad8-49d9-bdd5-9f1be362ef3f", async (err, payload) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        if(!payload){
            return res.status(403).send('Invalid token payload');
        }

        const userPayload = payload as {email : string, name : string};
        

        const user = await userModel.findOne({ email: userPayload.email });

        req.user = user;

        next();
    })

}

export default validateJWT;