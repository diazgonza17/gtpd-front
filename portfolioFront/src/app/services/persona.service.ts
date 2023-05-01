import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  
  persoURL = environment.apiURL+'perso/';

  constructor(private httpClient:HttpClient) { }

  public detail(): Observable<Persona> {
    return this.httpClient.get<Persona>(this.persoURL+`detail`);
  }

  public update(persona: Persona): Observable<any> {
    return this.httpClient.put<any>(this.persoURL+'update', persona);
  }
}
