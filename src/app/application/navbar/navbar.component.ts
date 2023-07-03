import { Component, Host, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApplicationComponent } from '../application.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public innerWidth: any = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(@Inject(Router) private router: Router, private userService: UserService, @Host() private app: ApplicationComponent) { }

  get isLogged() {
    return this.userService.isAuthenticated();
  }

  get _user() {
    return this.userService._usuario.user;
  }

  get lilName() {
    return this._user.nombres.split(' ')[0] + ' ' + this._user.apellidos.split(' ')[0];
  }

  get section () {
    return this.app.section;
  }

  logout() {
    this.userService.logout()
  }

  handleSection() {
    this.app.section = !this.app.section;
  }
}
