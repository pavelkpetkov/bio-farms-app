import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isUser = false;
  isFarmer = false;
  hide = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  loginUser(form: NgForm): void {
    if(form.invalid) { return; }
    const { username, password } = form.value;
    this.userService.loginUser({username, password}).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
  }

  loginFarmer(form: NgForm): void {
    if(form.invalid) { return; }
    const { username, password } = form.value;
    this.userService.loginFarmer({username, password}).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
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
