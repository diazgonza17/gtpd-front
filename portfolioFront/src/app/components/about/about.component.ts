import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  /*
  persona: persona = new persona("", "");

  aboutText:any;
  
  constructor(private portfolioService:PersonaService) {
  }

  
  ngOnInit(): void {

    
    this.portfolioService.getPersona().subscribe(data =>{
      this.persona = data;
    })
  

    this.portfolioService.obtenerDatos().subscribe(data =>{
      this.aboutText=data.about;
    });
  }
  */
}
