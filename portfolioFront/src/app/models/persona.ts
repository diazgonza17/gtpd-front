export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    titulo: string;
    ubicacion: string;
    about: string;
    //email: string;

    constructor(nombre: string, apellido: string, titulo: string, ubicacion: string, about: string /*, email: string*/ ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.titulo = titulo;
        this.ubicacion = ubicacion;
        this.about = about;
        //this.email = email;
    }
}