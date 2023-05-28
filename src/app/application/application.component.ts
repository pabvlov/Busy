import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { WorkService } from '../services/work.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  public innerWidth: any = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  /* Section 1 = Trabajos, Section 2 = Servicios */
  section = true;
  showingInfo = false;

  get ready() {
    return this.workService.ready;
  }

  constructor(private userService: UserService,
    private workService: WorkService,
    private router: Router,
    private swal: SwalService) {
  }

  isShowingAbout = false;

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    this.userService.logout();
  }

  get usuario() {
    return this.userService._usuario;
  }

  get job() {
    return this.workService.jobs[this.workService.pos];
  }

  get jobPos() {
    return this.workService.pos;
  }

  
  

  isLogged() {
    return this.userService.isAuthenticated();
  }

  

  gotoProfile() {
    if (!this.userService.isAuthenticated()) {
      this.swal.authFail();
    } else  {
      this.router.navigate(['app/profile']);
    }
  }

  gotoOffer() {
    if (!this.userService.isAuthenticated()) {
      this.swal.authFail();
    } else this.router.navigate(['app/offer']);
  }

  prev() {
    this.workService.prev();
  }

  next() {
    this.workService.next();
  }

  ngOnInit(): void {
    this.workService.updateWorks();
  }

  showAbout() {
    this.isShowingAbout = !this.isShowingAbout;
  }
  
  get foto() {
    return !!this.usuario.foto ? this.usuario.foto : 'app/defaultprofilepic.png';
  }



  
  

}
