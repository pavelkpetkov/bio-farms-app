import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  isUser = false;
  isFarmer = false;
  hide = false;
  errorMessage = '';

  formUser: FormGroup;
  formFarmer: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.formFarmer = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      farmName: ['', [Validators.required]],
      farmLocation: ['', [Validators.required]],
      products: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(3)]]
    })

  }

  registerUser(): void {
    if (this.formUser.invalid) { return; }
    // console.log(this.formUser.value);
    this.userService.registerUser(this.formUser.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    })
  }

  registerFarmer(): void {
    if (this.formFarmer.invalid) { return; }
    // console.log(this.formFarmer.value);
    this.userService.registerFarmer(this.formFarmer.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    })
  }

  userRole() {
    this.hide = true;
    return this.isUser = true;
  }

  farmerRole() {
    this.hide = true;
    return this.isFarmer = true;
  }
}
