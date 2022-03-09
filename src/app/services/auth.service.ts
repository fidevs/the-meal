import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const SESSION_KEY = "authenticated";
const USER_KEY = "user";

export interface LoginRequestI {
  user: string,
  password: string,
  remember: boolean,
};

export interface LoginResponseI {
  code: number,
  message: string,
};

export interface UserI {
  user: string,
  password: string,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.loadSession();
  }

  loadSession() {
    const isAuthenticated = localStorage.getItem(SESSION_KEY);
    if (isAuthenticated === null) this.isAuthenticated.next(false);
    else this.isAuthenticated.next(JSON.parse(isAuthenticated));
  }

  login(request: LoginRequestI): LoginResponseI {
    if (request && request.user && request.password) {
      if (request.user !== "user") return { code: 401, message: "Usuario incorrecto" };
      if (request.password !== "root") return { code: 401, message: "Contraseña incorrecta" };

      if (request.remember) this.saveUser(request.user, request.password);
      else localStorage.removeItem(USER_KEY);
      localStorage.setItem(SESSION_KEY, JSON.stringify(true));
      this.isAuthenticated.next(true);
      return { code: 200, message: "Bienvenido" };
    } else return { code: 400, message: "Las credenciales son invalidas"};
  }

  saveUser(user: string, password: string): void {
    localStorage.setItem(USER_KEY, JSON.stringify({user, password}));
  }

  consultUser(): UserI | null {
    const user = localStorage.getItem(USER_KEY);
    if (user !== null) return JSON.parse(user);
    return null;
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/');
  }

}
