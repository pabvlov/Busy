import { Component, Host, HostListener, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  
  constructor(private router: Router, @Host() private app: AppComponent, private userService: UserService) { }

  get isLogged() {
    return this.app.isLogged;
  }

  get _user() {
    return this.userService._usuario;
  }

  get lilName() {
    return this._user.nombres.split(' ')[0] + ' ' + this._user.apellidos.split(' ')[0];
  }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    this.router.navigate(['/'], { skipLocationChange: false });
    window.location.reload();
  }

  ngOnChanges(): void {
    if (localStorage.getItem('token')) {
      this.userService._session().subscribe(resp => {
        if(!resp) {
          this.app.isLogged = false;
        } else {
          this.app.isLogged = true;
        }
      });
    }
  }

  
}
