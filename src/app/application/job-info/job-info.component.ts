import { Component, Input, OnInit, OnChanges, HostListener, Host } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { ApplicationComponent } from '../application.component';
import { UtilsService } from 'src/app/services/utils.service';
import { SwalService } from 'src/app/services/swal.service';
import { Jobs } from 'src/app/interfaces/jobs';

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

  isViewingMap = false;

  mapskey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDa4NeSZREAb_IGxYJ6Z_5FDuCM2VWHyMQ&q="
  constructor(private userService: UserService, 
              private workService: WorkService, 
              @Host() private app: ApplicationComponent, 
              private utils: UtilsService,
              private swal: SwalService) { 

  }

  gotoJobs() {
    this.app.showingInfo = !this.app.showingInfo;
  }

  viewMap() {
    this.isViewingMap = !this.isViewingMap;
  }

  getUbicacion() {
    return this.job.work.ubicacion
  }

  getUserInfo() {
    console.log(this.job.work.rut_empleador);
    return this.userService.getUserByRut(this.job.work.rut_empleador.toString())
  }

  dateDiff(date: Date) {
    return this.utils.dateDiff(date);
  }

  applyWork() {
    const button = document.getElementById('apply')!;
    // verify if its his own job or if he already applied
    if (this.job.work.rut_empleador === this.userService._usuario.rut) {
      this.swal.error('Error al postular', 'No puedes postular a tu propio trabajo');
    }
    for (let index = 0; index < this.job.appliers.length; index++) {
      const element = this.job.appliers[index];
      if (element.rut === this.userService._usuario.rut) {
        this.swal.error('Error al postular', 'Ya has postulado a este trabajo');
        return;
      }
    }
    this.workService.applyWork(this.job.work.id, this.userService._usuario.rut).subscribe((data: any) => {
      button.classList.add('disabled');
      if (data.ok) {
        this.workService.updateWorks();
        this.swal.success('Postulación exitosa', data.message);
      } else {
        this.swal.error('Error al postular', data.message);
      }
    })
  }

  get isUpdating() {
    return this.workService.isUpdating;
  }

}
