import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {

  users: User[] = []

  scroll(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  
}
