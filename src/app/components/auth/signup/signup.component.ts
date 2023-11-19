import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  registerForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.nameInput = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(7)]);
    this.registerForm = new FormGroup({
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  signup() {
    this.authService.signup(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
      ).subscribe({
      next: (user: User) => {
        console.log("created",[user]);

        // Redirect to login page
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.router.navigate([''])
  }
}