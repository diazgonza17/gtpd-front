import { Component } from '@angular/core';
import { persona } from 'src/app/models/persona.model';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  persona: persona = new persona("", "");
  
  profileData:any;
  
  constructor(private portfolioService:PortfolioService) {
  }

  ngOnInit(): void {
    /*
    this.portfolioService.getPersona().subscribe(data =>{
      this.persona = data;
    })
    */

    this.portfolioService.obtenerDatos().subscribe(data =>{
      this.profileData=data.profile;
    });
  }

}
