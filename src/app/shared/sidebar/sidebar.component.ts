import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private router: Router) { }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    window.location.reload();
      
  }
}
