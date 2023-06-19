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
    const appliers = work.postulantes!.filter((postulantes) => postulantes.estado_postulacion === 1);
    // get only nombres and apellidos
    return appliers
  }

  tienePostulantesAceptados(work: Trabajo) {
    return work.postulantes!.filter((postulante) => postulante.estado_postulacion === 1).length <= +work.cantidad_personas!;
  }
}
