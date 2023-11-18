import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.nameInput = new FormControl('', [Validators.required]);
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.passwordInput = new FormControl('', [Validators.required]);
    this.registerForm = new FormGroup({
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
    });
  }

  ngOnInit(): void {
  }

  signup() {
    this.authService.signup(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe({
      next: (user: User) => {
        alert('Register successful');
        console.log(user);

        // Redirect to login page
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        alert('Register failed');
        console.log(error);
      }
    });
  }

}