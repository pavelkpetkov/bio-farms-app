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
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
    })

    this.formFarmer = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      farmName: ['', [Validators.required]],
      farmLocation: ['', [Validators.required]],
      products: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
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
      }
    })
  }

  registerFarmer(): void {
    if (this.formFarmer.invalid) { return; }
    console.log(this.formFarmer.value);
    this.userService.registerFarmer(this.formFarmer.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
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
