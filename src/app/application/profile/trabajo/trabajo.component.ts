import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WorkInformation } from 'src/app/interfaces/work-information';
import { Jobs } from 'src/app/interfaces/jobs';
import { Applier } from 'src/app/interfaces/applier';
import { MapsService } from 'src/app/services/maps.service';
import { SwalService } from 'src/app/services/swal.service';
import { Postulaciones } from 'src/app/interfaces/postulaciones';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {


  constructor(private route: ActivatedRoute, 
              private router: Router,
              private workService: WorkService, 
              private userService: UserService, 
              private utils: UtilsService,
              private maps: MapsService,
              private swal: SwalService,
              private location: Location) {}


  id: number = +this.route.snapshot.paramMap.get('id')!;

  get ready() {
    return this.workService.isUpdatingProfile;
  }

  get work(): Jobs {
    return this.workService.work;
  }

  get appliers(): Postulaciones[] {
    return this.workService.work.postulaciones;
  }

  get mapskey() {
    return this.maps.mapskey;
  }

  get empleador() {
    return this.workService.work.empleador
  };

  get apiUrl() {
    return environment.apiUrl;
  }

  goBackToPreviousPage() {
    this.location.back();
  }

  ngOnInit(): void {
    this.workService.updateProfileWork(this.id);
  }

  dateDiff(date: Date) {
    return this.utils.dateDiff(date);
  }

  getUserInfo() {
    return this.userService.getUserByRut(this.work.rut_empleador.toString())
  }

  goBack() {
    this.router.navigate(['/app/profile']);
  }

  handleDeleteWork() {
    this.workService.deleteWork(this.id).subscribe( resp => {
      this.swal.loading('Eliminando trabajo...');
      if (resp.ok) {
        this.swal.stopLoading();
        this.router.navigate(['/app/profile']);
      }
    })
  }

  handleChooseApplier(rut: number, state: number) {
    this.workService.chooseApplierWork(this.id, rut, state).subscribe( resp => {
      this.swal.loading('Seleccionando postulante...');
      
      if (resp.ok) {
        this.workService.updateProfileWork(this.work.id, false);
      }
      return resp.ok
    })      
  }

  

  workHasChosenApplier() {
    return this.workService.work.postulaciones.some( applier => applier.id_estado === 1);
  }

  workHasChosenApplierByRut(rut: number) {
    return this.workService.work.postulaciones.some( applier => applier.id_estado != 3 && applier.rut_trabajador === rut);
  }

  isAppliersApprovedLessThanMax() {
    return this.workService.work.postulaciones.filter( applier => applier.id_estado === 1).length < +this.workService.work.cantidad_personas;
  }

  maxAppliers() {
    return +this.workService.work.cantidad_personas === this.workService.work.postulaciones.length;
  }

  isEmployer() {
    return this.userService._usuario.user.rut === this.work.rut_empleador;
  }


}
