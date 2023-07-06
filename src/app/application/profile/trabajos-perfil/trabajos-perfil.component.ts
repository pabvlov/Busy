import { Component, Input } from '@angular/core';
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
    }
    // check if is not yet finished than today
    return new Date(date).getTime() > new Date().getTime() ? 1: 3;
  }

  postulantesAceptados(work: Trabajo): Postulante[] {
    if (work.postulantes === null) {
      return [];
    }
    return work.postulantes!.filter((applier) => applier.estado_postulacion === 1);
  }
  



  tienePostulantesAceptados(work: Trabajo) {
    return this.postulantesAceptados(work).length > 0;
  }
}
