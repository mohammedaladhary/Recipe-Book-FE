import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService, public router: Router) { }
  canActivate(): boolean{
    if(!this.auth.isAuthenticatied()){
      this.router.navigate(["signin"])
      return false
    }
    return true
  }
}
