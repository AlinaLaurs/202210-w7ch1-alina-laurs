import { Router } from 'express';
import { CoctailController } from '../controllers/coctails.js';
import { CoctailFileData } from '../data/coctails.file.data.js';

export const coctailRouter = Router();

const controller = new CoctailController(new CoctailFileData());

coctailRouter.get('/', controller.getAll.bind(controller));
coctailRouter.get('/:id', controller.get.bind(controller));
coctailRouter.post('/', controller.post.bind(controller));
coctailRouter.patch('/:id', controller.patch.bind(controller));
coctailRouter.delete('/:id', controller.delete.bind(controller));
