import { Request, Response, NextFunction } from 'express';
import { CoctailFileData } from '../data/coctails.file.data';
import { CoctailController } from './coctails';

describe('Given CoctailController', () => {
    const model = new CoctailFileData();
    const coctailController = new CoctailController(model);
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };

    const next = jest.fn();
    test('Then ... getAll', async () => {
        await coctailController.getAll(
            req as Request,
            resp as unknown as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalled();
    });
});
