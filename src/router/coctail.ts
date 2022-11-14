import { Router } from 'express';
import { CoctailController } from '../controllers/coctails.js';

export const coctailRouter = Router();

const controller = new CoctailController();

coctailRouter.get('/', controller.getAll);
coctailRouter.get('/:id', controller.get);
coctailRouter.post('/', controller.post);
coctailRouter.patch('/:id', controller.patch);
coctailRouter.delete('/:id', controller.delete);
