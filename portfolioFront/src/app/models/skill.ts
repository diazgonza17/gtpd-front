export class Skill {
    id?: number;
    nombreSki: string;
    score: number;

    constructor(nombreSki: string, score: number) {
        this.nombreSki = nombreSki;
        this.score = score;
    }
}