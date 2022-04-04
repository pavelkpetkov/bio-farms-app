import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUser = false;
  isFarmer = false;
  hide = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm): void {
    if(form.invalid) { return; }
    const { username, password } = form.value;
    this.userService.loginUser({username, password}).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
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
