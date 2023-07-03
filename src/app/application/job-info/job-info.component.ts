import { Component, Input, HostListener, Host } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { ApplicationComponent } from '../application.component';
import { UtilsService } from 'src/app/services/utils.service';
import { SwalService } from 'src/app/services/swal.service';
import { MapsService } from 'src/app/services/maps.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {

  @Input() id = 0;

  public innerWidth: any = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  get job() {
    return this.workService.jobs[this.workService.pos];
  }

  get work() {
    return this.job;
  }

  get applierslength() {
    if (this.job.postulaciones === null) {
      return 0
    } else 
    return this.job.postulaciones.length;
  }

  get appliers () {
    return this.job.postulaciones;
  }

  get isApplier() { 
    if (this.job.postulaciones === null) {
      return false;
    } else {
      return this.job.postulaciones.some((applier) => applier.rut_trabajador === this.userService._usuario.user.rut);
    }
  }

  get isJobOwner() {
    return this.job.rut_empleador === this.userService._usuario.user.rut;
  }

  isViewingMap = false;

  get mapskey() {
    return this.maps.mapskey;
  }
  
  constructor(private userService: UserService, 
              private workService: WorkService, 
              @Host() private app: ApplicationComponent, 
              private utils: UtilsService,
              private swal: SwalService,
              private maps: MapsService,
              private location: Location) { 

  }

  gotoJobs() {
    this.app.showingInfo = !this.app.showingInfo;
  }

  goBackToPreviousPage() {
    this.location.back();
  }

  viewMap() {
    this.isViewingMap = !this.isViewingMap;
  }

  getUbicacion() {
    return this.work.ubicacion
  }

  getUserInfo() {
    console.log(this.work.rut_empleador);
    return this.userService.getUserByRut(this.work.rut_empleador.toString())
  }

  dateDiff(date: Date) {
    return this.utils.dateDiff(date);
  }

  applyWork() {
    const button = document.getElementById('apply')!;
    // verify if its his own job or if he already applied
    if (this.work.rut_empleador === this.userService._usuario.user.rut) {
      this.swal.error('Error al postular', 'No puedes postular a tu propio trabajo');
    }
    for (let index = 0; index < this.applierslength; index++) {
      const element = this.job.postulaciones[index];
      if (element.rut_trabajador === this.userService._usuario.user.rut) {
        this.swal.error('Error al postular', 'Ya has postulado a este trabajo');
        return;
      }
    }
    this.workService.applyWork(this.work.id, this.userService._usuario.user.rut).subscribe((data: any) => {
      if (data.ok) {
        this.swal.success('Postulación exitosa', data.message);
        console.log(data);
        this.workService.updateWorks();
      } else {
        this.swal.error('Error al postular', data.message);
      }
    })
    
  }

  get isUpdating() {
    return this.workService.isUpdating;
  }

}
