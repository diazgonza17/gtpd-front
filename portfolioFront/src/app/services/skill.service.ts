import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skiURL = environment.apiURL+"ski/"

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.skiURL+'all');
  }

  public detail(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(this.skiURL+`detail/${id}`);
  }
  
  public save(skill: Skill): Observable<any> {
    return this.httpClient.post<any>(this.skiURL+'create', skill);
  }

  public update(id: number, skill: Skill): Observable<any> {
    return this.httpClient.put<any>(this.skiURL+`update/${id}`, skill);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skiURL+`delete/${id}`);
  }
}
