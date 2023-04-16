import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /*
  profileData:any;
  socialList:any;

  constructor(private datosPortfolio:PortfolioService) {
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.profileData=data.profile;
      this.socialList=data.socials;
    });
  }
  */
  isLogged = false;

  constructor(private router: Router, private tokenService: TokenService){
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
