import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { WorkInformation } from 'src/app/interfaces/work-information';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/interfaces/user';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit, OnChanges {

  get job() {
    return this.workService.jobs[this.workService.pos];
  }
  isViewingMap = false;

  mapskey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDa4NeSZREAb_IGxYJ6Z_5FDuCM2VWHyMQ&q="
  constructor(private userService: UserService, private workService: WorkService) { 

  }

  empleador: User = {
    rut: 0,
    dv: 0,
    nombres: '',
    apellidos: '',
    mail: '',
    foto: '',
    direccion: null,
    esAdmin: 0,
    fecha_nacimiento: null,
    fecha_registro: new Date(),
    ultima_visita: new Date(),
    ubicacion: undefined,
    aprobado: {
      type: '',
      data: []
    }
  }

  ngOnInit(): void {
    this.getUserInfo().subscribe((data: any) => {
      this.empleador = data[0]
    })
  }

  ngOnChanges(): void {
    
    this.empleador = {
      rut: 0,
      dv: 0,
      nombres: '',
      apellidos: '',
      mail: '',
      foto: '',
      direccion: null,
      esAdmin: 0,
      fecha_nacimiento: null,
      fecha_registro: new Date(),
      ultima_visita: new Date(),
      ubicacion: undefined,
      aprobado: {
        type: '',
        data: []
      }
    }
    this.getUserInfo().subscribe((data: any) => {
      this.empleador = data[0]
    })
  }

  viewMap() {
    this.isViewingMap = !this.isViewingMap;
  }

  getUbicacion() {
    return this.empleador.direccion
  }

  getUserInfo() {
    return this.userService.getUserByRut(this.job.rut_empleador.toString())
  }

  dateDiff(date: Date) {
    let fecha = new Date();
    let fecha2 = new Date(date);
    let diff = fecha2.getTime() - fecha.getTime();
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 0) {
      return "Hace " + Math.abs(diffDays) + " días";
    } else if (diffDays == 0) {
      return "Hoy";
    } else if (diffDays == 1) {
      return "Mañana";
    } else if (diffDays > 1) {
      return "En " + diffDays + " días";
    } else {
      return diffDays;
    }
  }

}
