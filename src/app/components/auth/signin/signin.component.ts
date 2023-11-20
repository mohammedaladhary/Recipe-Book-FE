import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent{
  nameInput: FormControl;
  passwordInput: FormControl;
  loginForm: FormGroup;
  externalErrorMsg: string;

  constructor(private authService: AuthService,private router: Router) {
    this.nameInput = new FormControl("",[Validators.required, Validators.minLength(5)]);
    this.passwordInput = new FormControl("",[Validators.required, Validators.minLength(7)]);
    this.loginForm = new FormGroup({
      name: this.nameInput,
      password: this.passwordInput,
    })
    this.externalErrorMsg = '';
  }

  signin() {
    // Attempt to login
    this.authService.signin(
      this.loginForm.value.name,
      this.loginForm.value.password)
      .subscribe({
      next: (response) => {
        console.log('Login successful');

        // Store user in local storage to keep user logged in between page refreshes
        localStorage.removeItem("Token");
        localStorage.setItem("Token", response.token);

        // Load user data
        this.authService.authenticate().subscribe({
          next: (userData: User) => {
            // Store user data in local storage
            localStorage.setItem('currentUser', JSON.stringify(userData));

            // Redirect to home page
            this.router.navigate(['/home'])
          }
        })
      },
      error: (error) => {
        console.log(error, error.status)
        if(error.status === 403) {
          this.externalErrorMsg = 'Wrong username/password';
        }
      }
    })
  }
}