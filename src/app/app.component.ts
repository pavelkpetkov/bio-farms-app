import { Component, Inject } from '@angular/core';
import { LocalStorage } from './core/injection-token';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bio-farms-app';

  constructor(
    @Inject(LocalStorage)
    private localStorage: Window['localStorage'],
    private userService: UserService
  ) {
    try {
      const localStorageFarmer = this.localStorage.getItem('<FARMER>') || 'ERROR';
      this.userService.farmer = JSON.parse(localStorageFarmer);
    } catch {
      this.userService.farmer = undefined;
    }
    try {
      const localStorageUser = this.localStorage.getItem('<USER>') || 'ERROR';
      this.userService.user = JSON.parse(localStorageUser);
    } catch {
      this.userService.user = undefined;
    }
  }
}
