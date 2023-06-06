import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-servicios-profile',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosProfileComponent {
  @Input('servicios') services: any[] = [];
}
