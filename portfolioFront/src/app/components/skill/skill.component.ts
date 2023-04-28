import { Component } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})

export class SkillComponent {

  constructor(private sSkill: SkillService, private tokenService: TokenService) { }
  
  ski: Skill[] = [];

  cargarSkill(): void {
    this.sSkill.all().subscribe(data => {this.ski = data});
  }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.cargarSkill();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  nombreSki: string = '';
  score: number = 0;

  onCreate(): void {
    const newSki = new Skill(this.nombreSki, this.score);
    this.sSkill.save(newSki).subscribe(data => {
      alert("Skill añadida");
      window.location.reload();
    }, err => {
      alert("Fallo al enviar Skill");
      window.location.reload();
    })
  }

  delete(id?: number): void {
    if(id != undefined) {
      this.sSkill.delete(id).subscribe(data => {
        this.cargarSkill();
      }, err => {
        alert("No se pudo eliminar la skill")
      })
    }
  }

  isEditing: boolean = false;

  onEdit(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const greatgrandpa = button.closest("li") as HTMLElement
    const progressbar = greatgrandpa.querySelector(".progress") as HTMLElement;
    const content = greatgrandpa.querySelector(".content") as HTMLElement;
    const editcontent = greatgrandpa.querySelector(".edit-content") as HTMLElement;
    const buttons = greatgrandpa.querySelector(".edit-delete-icons") as HTMLElement;

    if(!this.isEditing){
      progressbar.style.display = 'none';
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
    this.sSkill.update(id, this.ski.find(obj => obj.id == id)).subscribe(data => {
      alert("Skill modificada");
      window.location.reload();
    }, err => {
      alert("Error al modificar skill");
      window.location.reload();
    })
  }
}
