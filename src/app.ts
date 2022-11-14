import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Coctail } from './interfaces/coctail';
import importData from './mock/data.json' assert { type: 'json' };

export const app = express();
const data: Array<Coctail> = importData.coctails;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Try a coctail!');
    res.end();
});

app.get('/coctails', (req, res) => {
    res.json(data);
    res.end();
});

app.post('/coctails', (req, res) => {
    const newCoctail = {
        ...req.body,
        id: data.length + 1,
    };
    data.push(newCoctail);
    res.json(newCoctail);
    res.end();
});
