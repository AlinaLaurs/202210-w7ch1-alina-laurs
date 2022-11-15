import { Request, Response } from 'express';
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
    test('Then ... getAll', () => {
        coctailController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
