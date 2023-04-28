import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Red } from '../models/red';

@Injectable({
  providedIn: 'root'
})
export class RedService {
  redURL = "http://localhost:8080/red/"

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Red[]> {
    return this.httpClient.get<Red[]>(this.redURL+'all');
  }

  public detail(id: number): Observable<Red> {
    return this.httpClient.get<Red>(this.redURL+`detail/${id}`);
  }

  public save(red: Red): Observable<any> {
    return this.httpClient.post<any>(this.redURL+'create', red);
  }

  public update(id: number, red: Red): Observable<any> {
    return this.httpClient.put<any>(this.redURL+`update/${id}`, red);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.redURL+`delete/${id}`);
  }
}
