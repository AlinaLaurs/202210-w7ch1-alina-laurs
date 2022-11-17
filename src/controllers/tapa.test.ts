import { NextFunction, Request, Response } from 'express';
import { TapaRepository } from '../data/tapas.repository';
import { TapaController } from './tapas';

jest.mock('../data/tapas.repository');

describe('Given TapaController', () => {
    TapaRepository.prototype.getAll = jest.fn().mockResolvedValue(['Tequeños']);
    const repository = new TapaRepository();

    const tapaController = new TapaController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    test('Then ... getAll', async () => {
        await tapaController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ tapas: ['Tequeños'] });
    });
});
