import { Component } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /*
  contactData:any;
  constructor(private datosPortfolio:PersonaService) {
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.contactData = data.contact;
    });
  }
  */
}
