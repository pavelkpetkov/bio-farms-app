import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLoggedUser(): boolean {
    return this.userService.isLoggedUser;
  }

  get isLoggedFarmer(): boolean {
    return this.userService.isLoggedFarmer;
  }

  get clientName(): string {
    return this.userService.user?.username || '';
  }

  get farmerName(): string {
    return this.userService.farmer?.username || '';
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logoutClient(): void {
    this.userService.logoutClient().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  logoutFarmer(): void {
    this.userService.logoutFarmer().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
