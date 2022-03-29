import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formUser: FormGroup;
  formFarmer: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
    })

    this.formFarmer = this.fb.group({

    })


  }

  registerUser(): void {
    if (this.formUser.invalid) { return; }
    console.log(this.formUser.value);
  }

  registerFarmer(): void {

  }
}
