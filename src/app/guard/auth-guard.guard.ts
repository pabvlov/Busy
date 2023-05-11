import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


class UserToken {}
@Injectable({
  providedIn: 'root'
})
export class Permissions {
  constructor(private userService: UserService) {}
  canActivate(): boolean {
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private permissions: Permissions) {}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.permissions.canActivate());
      
      return this.permissions.canActivate();
  }
  
}
