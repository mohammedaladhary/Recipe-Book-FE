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
export class SignupComponent {

  nameInput: FormControl;
  passwordInput: FormControl;
  emailInput: FormControl;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.nameInput = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.passwordInput = new FormControl('', [Validators.required, Validators.minLength(7)]);
    this.emailInput = new FormControl('', [Validators.required, Validators.email]);
    this.registerForm = new FormGroup({
      name: this.nameInput,
      password: this.passwordInput,
      email: this.emailInput
    });
  }
  
  signup(){
    const user: User = new User(this.registerForm.value.name,
      this.registerForm.value.password,
      this.registerForm.value.email,)
      console.log(user);
    this.authService.signup(user).subscribe({
      next: (users: User)=>{
      console.log("created", [users])
    },
      error: (err) => console.log(err)
    })
    this.router.navigate(["/"])
  }
}