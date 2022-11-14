import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { Coctail } from '../interfaces/coctail.js';
const dataFile = process.env.DATA_FILE || '';
const importData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

// eslint-disable-next-line prefer-const
let data: Array<Coctail> = importData.coctails;

export class CoctailController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    get(req: Request, resp: Response) {
        data = data.filter((item) => item.id === +req.params.id);
        resp.json(data);
        resp.end();
    }

    post(req: Request, resp: Response) {
        const newCoctail = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newCoctail);
        resp.json(newCoctail);
        resp.end();
    }

    patch(req: Request, resp: Response) {
        const updateCoctail = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updateCoctail;
        resp.json(updateCoctail);
        resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
