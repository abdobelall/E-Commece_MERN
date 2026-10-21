import {Request, Response} from 'express';

export interface extendedRequest extends Request {
    user?: any;
}

