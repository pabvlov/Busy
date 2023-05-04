import { Component, Host, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private router: Router, @Host() private app: AppComponent, private userService: UserService) { }

  get isLogged() {
    return this.app.isLogged;
  }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    window.location.reload();
      



  }
}
