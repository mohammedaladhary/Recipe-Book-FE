import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // For simplicity, you can hardcode a user here.
  // In a real-world scenario, you would get this information from your authentication mechanism.
  private currentUser = {
    userId: 1,
    username: 'YourUsername',
    email: 'user@example.com',
    // Other user properties...
  };

  constructor() { }

  getCurrentUser() {
    return this.currentUser;
  }
}