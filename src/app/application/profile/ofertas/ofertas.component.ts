import { Component, Input } from '@angular/core';
import { WorkInformation } from 'src/app/interfaces/work-information';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent {

  @Input('ofertas') works: WorkInformation[] = [];
}
