import { createToken, readToken } from './auth';
import { SECRET } from './../config';
import jwt from 'jsonwebtoken';

const mock = {
    userName: 'Pepe',
};

// Compruebo si llamo a la función y si hace lo que tiene que hacer.
describe('Given createToken ', () => {
    test('Then ...', () => {
        const signSpy = jest.spyOn(jwt, 'sign');
        const r = createToken(mock);
        expect(typeof r).toBe('string');
        expect(signSpy).toHaveBeenCalledWith(mock, SECRET);
    });
});

describe('Given readToken ', () => {
    describe('When token is valid, ', () => {
        const token = createToken(mock);
        test('Then', () => {
            const r = readToken(token);
            expect(r.userName).toEqual(mock.userName);
        });

        describe('When token is not valid', () => {
            const token =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2Njg3NzMwNTB9.DGdcCXGRUS4SaCMyY5RSy-8v9tylvmV_HE1rQJGYJ_5';
            test('should', () => {
                expect(() => {
                    readToken(token);
                }).toThrow();
            });
        });

        describe('When token is bad formatted', () => {
            const token = 'Soy un token';
            test('should', () => {
                expect(() => {
                    readToken(token);
                }).toThrow();
            });
        });
    });
});
