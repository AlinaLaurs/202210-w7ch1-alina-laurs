import fs from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();
import { Coctail } from '../interfaces/coctail.js';
import { Data, id } from './data.js';

export class CoctailFileData implements Data<Coctail> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<Coctail>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Coctail>);
    }

    async get(id: id): Promise<Coctail> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Coctail>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newCoctail: Partial<Coctail>): Promise<Coctail> {
        const aData = await this.getAll();
        const finalCoctail = {
            ...(newCoctail as Coctail),
            id: this.#createID(),
        };
        aData.push(finalCoctail);
        await this.#saveData(aData);
        return finalCoctail;
    }

    async patch(id: id, updateCoctail: Partial<Coctail>): Promise<Coctail> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateCoctail,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item) => item.id !== id);
        await this.#saveData(aData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Array<Coctail>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
