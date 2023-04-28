export class Proyecto {
    id?: number;
    nombrePro: string;
    descripcionPro: string;
    link: string;

    constructor(nombrePro: string, descripcionPro: string, link: string) {
        this.nombrePro = nombrePro;
        this.descripcionPro = descripcionPro;
        this.link = link;
    }
}