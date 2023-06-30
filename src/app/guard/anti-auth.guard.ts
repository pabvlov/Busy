import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class Permissions {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class AntiAuthGuard  {
  constructor(private permissions: Permissions) {}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {          
      return this.permissions.canActivate();
  }
  
}

