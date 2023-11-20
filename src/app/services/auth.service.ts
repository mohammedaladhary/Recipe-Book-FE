import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:5005/auth';
  constructor(private http: HttpClient) { }

  isAuthenticatied(): boolean {
    const token: string | null = localStorage.getItem("Token")
    return token!==null
  }
  
  authenticate(): Observable<User> {
    // Get the token from the local storage
    const storedToken: string | null = localStorage.getItem("Token");

    if (storedToken === null) {
      throw null;
    }
    // Create the Authorization header
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${storedToken}`
      })
    };

    // Get logged user information
    return this.http.get<User>(`${this.apiUrl}/verify`, options);
  }

  //signup method
  signup( name: string, password: string, email: string ): Observable<User> {
    const user: User = new User(0,name,password,email)
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  //signin method
  signin( name: string, password: string ): Observable<any> {
    const body = {name, password}
    return this.http.post<any>(`${this.apiUrl}/signin`, body);
  }

  logout(){
    localStorage.removeItem("Token")
    localStorage.removeItem("Token")
  }
}