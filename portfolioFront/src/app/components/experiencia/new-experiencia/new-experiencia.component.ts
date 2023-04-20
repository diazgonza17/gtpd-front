import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/services/s-experiencia.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent {
  nombreExp: string = '';
  descripcionExp: string = '';

  constructor(private sExperiencia: SExperienciaService, private router: Router) { }

  onCreate(): void {
    const exp = new Experiencia(this.nombreExp, this.descripcionExp);
    this.sExperiencia.save(exp).subscribe(data => {
      alert("Experiencia añadida");
      console.log(exp);
      this.router.navigate(['']);
    }, err => {
      alert('Fallo');
      this.router.navigate(['']);
    })
  }
}
