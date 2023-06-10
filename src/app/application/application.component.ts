import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { WorkService } from '../services/work.service';
import { SwalService } from '../services/swal.service';
import { WorkInformation } from '../interfaces/work-information';
import { ServiceService } from '../services/service.service';

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
    return this.workService.ready && this.serviceService.ready;
  }

  constructor(private userService: UserService,
    private workService: WorkService,
    private serviceService: ServiceService,
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

  get userRut() {
    return this.serviceService.services[this.serviceService.pos].rut_usuario;
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
    if (this.section) {
      this.workService.prev();
    } else {
      this.serviceService.prev();
    }
  }

  next() {
    if (this.section) {
      this.workService.next();
    } else {
      this.serviceService.next();
    }
  }

  ngOnInit(): void {
    this.workService.updateWorks();
    this.serviceService.updateServices();
  }

  showAbout() {
    this.isShowingAbout = !this.isShowingAbout;
  }
  
  get foto() {
    return !!this.usuario.foto ? this.usuario.foto : 'app/defaultprofilepic.png';
  }

  



  
  

}
