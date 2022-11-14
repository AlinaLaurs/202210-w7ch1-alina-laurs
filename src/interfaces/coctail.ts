export type ProtoCoctail = {
    name: string;
    color: string;
    ingredient: string;
    alcohol: boolean;
};

export type Coctail = {
    id: number;
    name: string;
    color: string;
    ingredient: string;
    alcohol: boolean;
};

export class CoctailModel implements ProtoCoctail {
    alcohol: boolean;
    constructor(
        public name: string,
        public color: string,
        public ingredient: string
    ) {
        this.alcohol = false;
    }
}
