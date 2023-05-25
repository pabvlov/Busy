import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private userService: UserService) { }

  get isLogged() {
    return this.userService.isAuthenticated();
  }

  get _user() {
    return this.userService._usuario;
  }

  get lilName() {
    return this._user.nombres.split(' ')[0] + ' ' + this._user.apellidos.split(' ')[0];
  }

  logout() {
    this.userService.logout()
  }
}
