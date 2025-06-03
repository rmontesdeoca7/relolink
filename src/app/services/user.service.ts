import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}SaveUser`, data);
  }
}
