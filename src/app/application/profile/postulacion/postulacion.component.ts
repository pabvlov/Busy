import { Component, Input } from '@angular/core';
import { Applier } from 'src/app/interfaces/applier';
import { Jobs } from 'src/app/interfaces/jobs';
import { Postulaciones } from 'src/app/interfaces/postulaciones';
import { SwalService } from 'src/app/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.scss']
})
export class PostulacionComponent {
  @Input('applier') applier!: any;
  @Input('work') work!: Jobs;
  @Input('id') id!: number;
  @Input('userRut') userRut!: number;

  constructor(private workService: WorkService, 
              private userService: UserService, 
              private swal: SwalService) { }


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
    if (this.userService._usuario.user == null || this.work == null){
      return false;
    } 
    else return this.userService._usuario.user.rut === this.work.rut_empleador;
  }

  // necesito verificar si el usuario tiene trabajo_realizado en una postulación en específico,
  // para ello se debe buscar en la una coincidencia en cada "applier" de "get appliers", pero el id del "applier"
  // lo paso como paramentro de entrada

  hasNullTrabajoRealizado(applier: Postulaciones): boolean {
    return applier.trabajo_realizado_propio === null;
  }

  
  cantidadEstrellas(applier: Postulaciones): number[] {
    return [...Array(5).keys()].map( i => i + 1).slice(0, applier.trabajo_realizado_propio?.calificacion_trabajador || 0);
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

  fechaTermino(applier: Postulaciones) {
    if(applier.trabajo_realizado_propio == null) {
      return ''
    } else return applier.trabajo_realizado_propio.fecha_termino
  }
}
