import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { Tapa } from '../entities/tapa.js';
import { HTTPError } from '../interfaces/error.js';

export class TapaController {
    constructor(public repository: Data<Tapa>) {}
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const tapas = await this.repository.getAll();
            resp.json({ tapas });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const tapa = await this.repository.get(+req.params.id);
            resp.json({ tapa });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const tapa = await this.repository.post(req.body);
            resp.json({ tapa });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const tapa = await this.repository.patch(+req.params.id, req.body);
            resp.json({ tapa });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(+req.params.id);
            resp.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
