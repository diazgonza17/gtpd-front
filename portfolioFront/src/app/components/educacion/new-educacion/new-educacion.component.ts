import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent {
  nombreEdu: string;
  descripcionEdu: string;

  constructor(private sEducacion: EducacionService, private router: Router) { }

  onCreate(): void {
    const educacion = new Educacion(this.nombreEdu, this.descripcionEdu);
    this.sEducacion.save(educacion).subscribe(data => {
      alert("Educacion agregada");
      this.router.navigate(['']);
    }, err => {
      alert("Fallo");
      this.router.navigate(['']);
    });
  }
}
