import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Red } from 'src/app/models/red';
import { AuthService } from 'src/app/services/auth.service';
import { RedService } from 'src/app/services/red.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {  

  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(private sRed: RedService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  red: Red[] = [];

  cargarRed(): void {
    this.sRed.all().subscribe(data => { this.red = data });
  }

  ngOnInit(): void {
    this.cargarRed();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    } else {
      this.isLogged = false;
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password); 
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        window.location.reload();
      }, err => {
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
      }
    )
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  link: string = '';
  clase: string = '';

  onCreate(): void {
    const newred = new Red(this.link, this.clase);
    this.sRed.save(newred).subscribe(data => {
      alert("Red añadida");
      window.location.reload();
    }, err => {
      alert("Fallo al enviar red");
      window.location.reload();
    })
  }
  
  delete(id?: number): void {
    if(id != undefined){
      this.sRed.delete(id).subscribe(data => {
        this.cargarRed();
      }, err => {
        alert("No se pudo eliminar la red");
      })
    } 
  }
  
  onUpdate(id?: number): void {
    this.sRed.update(id, this.red.find(obj => obj.id == id)).subscribe(data => {
      alert("Red modificada");
      window.location.reload();
    }, err => {
      alert("Error al modificar red");
      window.location.reload();
    })
  }
}
