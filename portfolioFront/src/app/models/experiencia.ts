export class Experiencia {
    id?: number;
    nombreExp: string;
    descripcionExp: string;
    inicioExp: number;
    finExp: number;

    constructor(nombreExp: string, descripcionExp: string, inicioExp: number, finExp: number){
        this.nombreExp = nombreExp;
        this.descripcionExp = descripcionExp;
        this.inicioExp = inicioExp;
        this.finExp = finExp;
    }
}
