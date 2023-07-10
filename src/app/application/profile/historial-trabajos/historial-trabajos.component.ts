import { Component, Input } from '@angular/core';
import { Postulacion, Trabajo, TrabajoInfo } from 'src/app/interfaces/user-information';

@Component({
  selector: 'app-historial-trabajos',
  templateUrl: './historial-trabajos.component.html',
  styleUrls: ['./historial-trabajos.component.scss']
})
export class HistorialTrabajosComponent {
  @Input('postulaciones') postulaciones: Postulacion[] = [];

  isDone(trabajo: TrabajoInfo) {
    return trabajo.trabajo_realizado_propio != null;
  }

  getStars(trabajo: TrabajoInfo) {
    if (trabajo.trabajo_realizado_propio === null) {
      return [];
    } else if(trabajo.trabajo_realizado_propio.calificacion_empleador == 5) {
      return [1, 2, 3, 4, 5];
    } else if(trabajo.trabajo_realizado_propio.calificacion_empleador == 4) {
      return [1, 2, 3, 4];
    }
    else if(trabajo.trabajo_realizado_propio.calificacion_empleador == 3) {
      return [1, 2, 3];
    }
    else if(trabajo.trabajo_realizado_propio.calificacion_empleador == 2) {
      return [1, 2];
    }
    else if(trabajo.trabajo_realizado_propio.calificacion_empleador == 1) {
      return [1];
    }
    else {
      return [1, 2, 3, 4, 5];
    }
  }
}

