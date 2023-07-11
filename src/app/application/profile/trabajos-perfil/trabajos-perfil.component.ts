import { Component, Input } from '@angular/core';
import { Applier } from 'src/app/interfaces/applier';
import { Postulante, Trabajo } from 'src/app/interfaces/user-information';

@Component({
  selector: 'app-trabajos-profile',
  templateUrl: './trabajos-perfil.component.html',
  styleUrls: ['./trabajos-perfil.component.scss']
})
export class TrabajosProfileComponent {

  @Input('ofertas') works: Trabajo[] = [];

  disponible(date: Date) {

    // 1 = disponible
    // 2 = tiene postulantes aceptados
    // 3 = no disponible
    // check if it doesn't have accepted postulants
    if (this.works.some((work) => work.postulantes!.some((applier) => applier.estado_postulacion === 1))) {
      return 2
    }else return new Date(date).getTime() > new Date().getTime() ? 1: 3;
  }

  isDone(work: Trabajo) {
    return work.trabajo_realizado_propio != null;
  }

  postulantesAceptados(work: Trabajo): Postulante[] {
    if (work.postulantes === null) {
      return [];
    }
    return work.postulantes!.filter((applier) => applier.estado_postulacion === 1);
  }
  
  getPostulantes(appliers: Postulante[]) {
    if (appliers === null) {
      return 0;
    }
    return appliers.length
  }


  tienePostulantesAceptados(work: Trabajo) {
    return this.postulantesAceptados(work).length > 0;
  }
}
