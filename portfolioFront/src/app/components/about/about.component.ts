import { Component } from '@angular/core';
import { persona } from 'src/app/models/persona.model';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  //persona: persona = new persona("", "");

  aboutText:any;
  
  constructor(private portfolioService:PortfolioService) {
  }

  
  ngOnInit(): void {

  /*  
    this.portfolioService.getPersona().subscribe(data =>{
      this.persona = data;
    })
  */

    this.portfolioService.obtenerDatos().subscribe(data =>{
      this.aboutText=data.about;
    });
  }

}
