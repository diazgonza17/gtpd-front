export class Educacion {
    id?: number;
    nombreEdu: string;
    descripcionEdu: string;
    inicioEdu: number;
    finEdu: number;

    constructor(nombreEdu: string, descripcionEdu: string, inicioEdu: number, finEdu: number){
        this.nombreEdu = nombreEdu;
        this.descripcionEdu = descripcionEdu;
        this.inicioEdu = inicioEdu;
        this.finEdu = finEdu;
    }
}
