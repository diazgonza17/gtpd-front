import { Component } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {

  constructor (private sProyecto: ProyectoService, private tokenService: TokenService) { }

  pro: Proyecto[] = [];

  cargarProyecto(): void {
    this.sProyecto.all().subscribe(data => { this.pro = data });
  }

  isLogged: boolean = false;
  
  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  nombrePro: string = '';
  descripcionPro: string = '';
  link: string = '';

  onCreate(): void {
    const newpro = new Proyecto(this.nombrePro, this.descripcionPro, this.link);
    this.sProyecto.save(newpro).subscribe(data => {
      alert("Proyecto añadido");
      window.location.reload();
    }, err => {
      alert("Fallo al enviar proyecto");
      window.location.reload();
    })
  }

  delete(id?: number): void {
    if(id != undefined) {
      this.sProyecto.delete(id).subscribe(data => {
        this.cargarProyecto();
      }, err => {
        alert("No se pudo eliminar la experiencia");
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
      buttons.style.display = 'none';
      editcontent.style.display = 'block';
      this.isEditing = true;
    }
  }

  onCloseEdit(): void {
    const message = "Are you sure? All changes will be lost.";
    const result = window.confirm(message);
    window.location.reload();
  }

  onUpdate(id?: number): void {
    this.sProyecto.update(id, this.pro.find(obj => obj.id == id)).subscribe(data => {
      alert("Proyecto modificado");
      window.location.reload();
    }, err => {
      alert("Error al modificar proyecto");
      window.location.reload();
    })
  }
}
 