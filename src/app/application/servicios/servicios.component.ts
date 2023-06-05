import { Component, Host, Input } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { ApplicationComponent } from '../application.component';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  constructor(private serviceServices: ServiceService, @Host() private app: ApplicationComponent) { }

  get pos() {
    return this.serviceServices.pos;
  }

  get services() {
    return this.serviceServices.services;
  }

  showMore() {
    this.app.showingInfo = !this.app.showingInfo;
  }
}
