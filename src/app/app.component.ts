import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'busy';
  isLogged: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.renewSession().subscribe(resp => {
        this.isLogged = true;
      });
      
    }
  }
}
