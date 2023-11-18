import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5005/auth';
  
  public currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out

  constructor(private http: HttpClient) { }

  // For simplicity, you can hardcode a user here.
  // In a real-world scenario, you would get this information from your authentication mechanism.
  private currentUser = {
    userId: 1,
    username: 'YourUsername',
    email: 'user@example.com',
    // Other user properties...
  };

  getCurrentUser() {
    return this.currentUser;
  }

  signup(name: string, email: string, password: string): Observable<User> {

    const user: User = new User(
      null,
      name,
      email,
      password,
      []
    );
    // Register a new user
    return this.http.post<User>(`${this.apiUrl}/signup`, user);

  }

  signin(email: string, password: string): Observable<any> {

    const body = {
      email,
      password
    };
    // Check credentials in the server
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body);
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
    return this.http.get<User>(`${this.apiUrl}/auth/verify`, options);
  }
}