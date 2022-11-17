import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { TapaRepository } from './tapas.repository';

const mockData = [
    {
        name: 'Ensaladilla rusa',
        origin: 'Spanish',
        ingredient: 'Potato',
        tasted: true,
    },
    {
        name: 'Pincho de tortilla',
        origin: 'Spanish',
        ingredient: 'Onion',
        tasted: true,
    },
];

describe('Given ...', () => {
    const repository = new TapaRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    });

    test('Then post ...', async () => {
        const newTapa = {
            name: 'Croquetas de jamón',
        };
        const result = await repository.post(newTapa);
        expect(result.name).toEqual(newTapa.name);
    });

    afterAll(() => {
        mongoose.disconnect();
    });
});
