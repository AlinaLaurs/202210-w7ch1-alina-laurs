import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { coctailRouter } from './router/coctail.js';
import { CustomError } from './interfaces/error.js';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API Express de cócteles y tapas').end();
});

app.use('/coctails', coctailRouter);
app.use('/tapas', tapaRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
    (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
        console.log(
            error.name,
            error.statusCode,
            error.statusMessage,
            error.message
        );
        let status = error.statusCode || 500;
        if (error.name === 'ValidationError') {
            status = 406;
        }
        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
