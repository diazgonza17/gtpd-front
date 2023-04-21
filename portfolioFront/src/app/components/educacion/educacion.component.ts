import { Component } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';
//import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  /*
  educationList:any;
  constructor(private datosPortfolio:PortfolioService) {
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educationList=data.education;
    });
  }
  */

  edu: Educacion[] = [];

  constructor(private sEducacion: EducacionService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion(): void {
    this.sEducacion.all().subscribe(data => { this.edu = data });
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
}
