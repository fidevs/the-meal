import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginResponseI, UserI } from '../services/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  rememberUser: UserI | null = null;

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators. required]),
      remember: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.rememberUser = this.authService.consultUser();
    this.authService.isAuthenticated.value && this.router.navigateByUrl('/home');
  }

  onSubmit() {
    const response: LoginResponseI = this.authService.login(this.loginForm.value);
    if (response.code !== 200) {
      this.snackBar.open(response.message, "OK", {
        duration: 3000,
        panelClass: [ 'snack-error' ]
      });
    } else this.router.navigateByUrl("/home");
  }

  get user() { return this.loginForm.get('user'); }

  get password() { return this.loginForm.get('password'); }

  loginRemember() {
    this.loginForm.setValue({
      user: this.rememberUser?.user,
      password: this.rememberUser?.password,
      remember: true
    });
  }

}
