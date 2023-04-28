import { Component } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {

  constructor(private sEducacion: EducacionService, private tokenService: TokenService) { }
  
  edu: Educacion[] = [];

  cargarEducacion(): void {
    this.sEducacion.all().subscribe(data => { this.edu = data });
  }
  
  isLogged: boolean = false;
  yearList: number[] = [];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 100;
    for(let i = minYear; i <= currentYear; i++) this.yearList.push(i);

    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  isNewEduActual: boolean = false;
  isEduActual: boolean = false;

  onNewActualChange(event: any) {
    this.isNewEduActual = event.target.checked;
  }
  onActualChange(event: any) {
    this.isEduActual = event.target.checked;
  }

  nombreEdu: string = '';
  descripcionEdu: string = '';
  inicioEdu: number = 0;
  finEdu: number = 0;

  onCreate(): void {
    if(this.isNewEduActual) this.finEdu = 0;
    const newedu = new Educacion(this.nombreEdu, this.descripcionEdu, this.inicioEdu, this.finEdu);
    this.sEducacion.save(newedu).subscribe(data => {
      alert("Educacion añadida");
      window.location.reload();
    }, err => {
      alert('Fallo al enviar educacion');
      window.location.reload();
    })
  }

  delete(id?: number): void {
    if (id != undefined) {
      this.sEducacion.delete(id).subscribe(data => {
        this.cargarEducacion();
      }, err => {
        alert("No se pudo eliminar la educacion");
      })
    }
  }

  isEditing: boolean = false;

  onEdit(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const grandpa = button.closest(".h3-div") as HTMLElement;
    const content = grandpa.querySelector(".content") as HTMLElement;
    const editcontent = grandpa.querySelector(".edit-content") as HTMLElement;
    const buttons = grandpa.querySelector(".edit-delete-icons") as HTMLElement;
    if(!this.isEditing){
      content.style.display = 'none';
      editcontent.style.display = 'block';
      buttons.style.display = 'none';
      this.isEditing = true;
    }
  }




  onCloseEdit(): void {
    const message = "Are you sure? All changes will be lost.";
    const result = window.confirm(message);
    window.location.reload();
  }

  onUpdate(id?: number): void {
    let updEdu = this.edu.find(obj => obj.id == id);
    if(this.isEduActual) updEdu.finEdu = 0;
    this.sEducacion.update(id, updEdu).subscribe(data => {
      alert("Educacion modificada");
      window.location.reload();
    }, err => {
      alert("Error al modificar educacion");
      window.location.reload();
    })
  }
}
