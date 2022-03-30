import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IUser } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: { username: string; email: string; password: string }) {
    return this.http.post<IUser>(`http://localhost:3030/auth/register`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

}
