import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
    const storedToken: string | null = localStorage.getItem('authToken');

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

  signup(name: string, email: string, password: string): Observable<User> {
    const user: User = new User(
      null,
      name,
      email,
      password,
    );
    // Register a new user
    return this.http.post<User>(`${this.apiUrl}/signup`, user);

  }

  signin(name: string, password: string): Observable<any> {

    const body = {
      name,
      password
    };
    // Check credentials in the server
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  logout(){
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
  }
}