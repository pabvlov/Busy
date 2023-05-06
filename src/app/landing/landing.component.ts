import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { AuthGuardGuard, Permissions } from '../guard/auth-guard.guard';
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit, OnInit {

  users: User[] = []

  scroll(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  constructor(private userService: UserService, private auth: AuthGuardGuard, private route: Router, private permission: Permissions) { }

  get _user() {
    return this.userService._usuario;
  }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  ngOnInit(): void {
    this.userService._session().subscribe(resp => {
      if (resp) {
        this.route.navigate(['/app']);
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  
}
