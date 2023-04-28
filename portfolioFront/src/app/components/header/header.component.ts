import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private sPersona: PersonaService, private tokenService: TokenService) { }

  perso: Persona;

  cargarPersona(): void {
    this.sPersona.detail().subscribe(data => {this.perso = data});
  }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.cargarPersona();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  nombre: string = '';
  apellido: string = '';
  titulo: string = '';
  ubicacion: string = '';
  about: string = '';
  //email: string = '';

  isEditing: boolean = false;

  onEdit(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const grandpa = button.closest("#profile-info") as HTMLElement;
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

  onUpdate(): void {
    this.sPersona.update(this.perso).subscribe(data => {
      alert("Persona modificada");
      window.location.reload();
    }, err => {
      alert("Error al modificar persona");
      window.location.reload();
    });
  }
}
