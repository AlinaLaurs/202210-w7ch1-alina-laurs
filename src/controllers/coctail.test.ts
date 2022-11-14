import { Request, Response } from 'express';
import { CoctailController } from './coctails.js';

describe('Given CoctailController', () => {
    const coctailController = new CoctailController();
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then ... getAll', () => {
        coctailController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
