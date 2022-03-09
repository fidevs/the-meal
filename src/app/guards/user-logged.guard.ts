import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(): Observable<boolean> {

    return this.authService.isAuthenticated.pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) this.router.navigateByUrl('/')
        return isAuthenticated;
      })
    )
  }

}
