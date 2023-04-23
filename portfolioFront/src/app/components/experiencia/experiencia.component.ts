import { Component } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service'

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }
  
  cargarExperiencia(): void {
    this.sExperiencia.all().subscribe(data => { this.exp = data });
  }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  exp: Experiencia[] = [];
  nombreExp: string = '';
  descripcionExp: string = '';
  
  onCreate(): void {
    const newexp = new Experiencia(this.nombreExp, this.descripcionExp);
    this.sExperiencia.save(newexp).subscribe(data => {
      alert("Experiencia añadida");
      console.log(newexp);
      window.location.reload();
    }, err => {
      alert('Fallo');
      window.location.reload();
    })
  }
  
  delete(id?: number): void {
    if (id != undefined) {
      this.sExperiencia.delete(id).subscribe(data => {
        this.cargarExperiencia();
      }, err => {
        alert("No se pudo eliminar la experiencia");
      })
    }
  }

  isEditing = false;
  
  onEdit(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const grandpa = button.closest(".h3-div") as HTMLElement;
    //At first, I tried placing an empty div as reference in between, using previousElementSibling and nextElementSibling, but i found a better way
    //It was funny tho so i keep it here, laugh accordingly 
    //const unforgivable_sin = grandpa.querySelector('.just-a-reference-to-make-the-js-simpler-please-forgive-me-if-you-see-this') as HTMLElement;
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

  onCloseEdit(event: MouseEvent): void {
    const message = "Are you sure? All changes will be lost.";
    const result = window.confirm(message);
    if(result && this.isEditing) {
      const button = event.target as HTMLButtonElement;
      const grandpa = button.closest(".h3-div") as HTMLElement;
      const content = grandpa.querySelector(".content") as HTMLElement;
      const editcontent = grandpa.querySelector(".edit-content") as HTMLElement;
      const buttons = grandpa.querySelector(".edit-delete-icons") as HTMLElement;
      content.style.display = 'block';
      editcontent.style.display = 'none';
      buttons.style.display = 'block';
      this.isEditing = false;
      
      content.querySelector(".nombreExp").textContent = 'Please wait...';
      content.querySelector(".descripcionExp").textContent = 'If this doesn\'t change, reload the site';
      window.location.reload();
    }
  }

  onUpdate(id?: number): void {
    this.sExperiencia.update(id, this.exp.find(obj => obj.id == id)).subscribe(data => {
      alert("Experiencia modificada");
      window.location.reload();
    }, err => {
      alert("Error al modificar experiencia");
      window.location.reload();
    })
  }
}
