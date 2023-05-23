import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { WorkService } from '../services/work.service';
import { ApiResponse } from '../interfaces/api-response';
import { getLocaleMonthNames } from '@angular/common';
import { Work } from '../interfaces/work';
import { Jobs } from '../interfaces/jobs';
import Swal from 'sweetalert2';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(private userService: UserService,
    private workService: WorkService,
    private router: Router,
    private swal: SwalService) {
  }

  isShowingAbout = false;

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    this.router.navigate(['/'], { skipLocationChange: false });
    window.location.reload();
  }

  get usuario() {
    return this.userService._usuario;
  }

  pos = 0;

  next() {
    if (this.jobs.length - 1 > this.pos) {
      this.pos++;
    }
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
    if (this.pos > 0) this.pos--;
  }

  ngOnInit(): void {
    this.workService.getWorks().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.jobs = data.content;
      } else {
        console.log(data.message);
      }
    })
  }

  showAbout() {
    this.isShowingAbout = !this.isShowingAbout;
  }



  jobs: Jobs[] = [
    {
      id: 1,
      titulo: 'Desarrollador Web',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      rut_empleador: 20482869,
      foto: '1684560833479-mrlapaditeaxe.webp',
      cantidad_personas: '1',
      ubicacion: null,
      fecha_publicacion: new Date(),
      fecha_seleccion_postulante: new Date(),
      fecha_finalizacion: new Date(),
      precio: null
    }
  ];
  

}
