import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  
    constructor(private userService: UserService) {
        if (!this.userService.isAuthenticated()) {
          window.location.href = '/';
        }
    }

}
