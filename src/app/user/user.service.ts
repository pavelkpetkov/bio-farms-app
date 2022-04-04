import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IFarmer } from '../shared/interfaces/farmer';
import { IUser } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser | null | undefined = undefined;
  farmer: IFarmer | null | undefined = undefined;

  get isLoggedUser(): boolean {
    return !!this.user;
  }

  get isLoggedFarmer(): boolean {
    return !!this.farmer;
  }

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: { username: string; email: string; password: string }) {
    return this.http.post<IUser>(`http://localhost:3030/auth/registerUser`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  registerFarmer(data: { username: string; email: string; farmName: string; farmLocation: string; products: string, password: string }) {
    return this.http.post<IFarmer>(`http://localhost:3030/auth/registerFarmer`, data, { withCredentials: true }).pipe(
      tap((farmer) => this.farmer = farmer)
    );
  }

  loginUser(data: { username: string; password: string }) {
    return this.http.post<IUser>(`http://localhost:3030/auth/loginUser`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  loginFarmer(data: { username: string; password: string }) {
    return this.http.post<IFarmer>(`http://localhost:3030/auth/loginFarmer`, data, { withCredentials: true }).pipe(
      tap((farmer) => this.farmer = farmer)
    );
  }

  logoutClient() {
    return this.http.get<IUser>(`http://localhost:3030/auth/logout`, { withCredentials: true }).pipe(
      tap(() => this.user = null)
    );
  }

  logoutFarmer() {
    return this.http.get<IFarmer>(`http://localhost:3030/auth/logout`, { withCredentials: true }).pipe(
      tap(() => this.farmer = null)
    );
  }

}
