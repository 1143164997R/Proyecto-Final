import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private router: Router) {
  }

  async canActivate() {
    const {value} = await Storage.get({key: "isUserLoggedIn"});
    if ( value == 'true' ) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
    
  }
  
}