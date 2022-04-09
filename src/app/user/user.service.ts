import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../core/injection-token';
import { IFarmer } from '../shared/interfaces/farmer';
import { IUser } from '../shared/interfaces/user';

@Injectable()

export class UserService {

  user: IUser | null | undefined = undefined;
  farmer: IFarmer | null | undefined = undefined;

  get isLoggedUser(): boolean {
    return !!this.user;
  }

  get isLoggedFarmer(): boolean {
    return !!this.farmer;
  }

  get isLogged(): boolean {
    if (this.isLoggedUser === true) { return true; }
    else if (this.isLoggedFarmer === true) { return true; }
    else { return false; }
  }

  constructor(
    @Inject(LocalStorage)
    private localStorage: Window['localStorage'],
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
      tap((user) => {
        this.user = user;
        this.localStorage.setItem('<USER>', JSON.stringify(this.user))
      })
    );
  }

  loginFarmer(data: { username: string; password: string }) {
    return this.http.post<IFarmer>(`http://localhost:3030/auth/loginFarmer`, data, { withCredentials: true }).pipe(
      tap((farmer) => {
        this.farmer = farmer;
        this.localStorage.setItem('<FARMER>', JSON.stringify(this.farmer))
      })
    );
  }

  logoutClient() {
    return this.http.get<IUser>(`http://localhost:3030/auth/logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.user = null;
        this.localStorage.removeItem('<USER>');
      }));
  }

  logoutFarmer() {
    return this.http.get<IFarmer>(`http://localhost:3030/auth/logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.farmer = null;
        this.localStorage.removeItem('<FARMER>');
      }));
  }

  getFarmerInfo(id: string) {
    return this.http.get<IFarmer>(`http://localhost:3030/auth/profileFarmer/${id}`, { withCredentials: true });
  }

}
