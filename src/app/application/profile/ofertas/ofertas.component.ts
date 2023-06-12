import { Component, Input } from '@angular/core';
import { Jobs } from 'src/app/interfaces/jobs';
import { Trabajo } from 'src/app/interfaces/user-information';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent {

  @Input('ofertas') works: Trabajo[] = [];

  disponible(date: Date) {
    return new Date(date).getTime() > new Date().getTime();
  }

}
