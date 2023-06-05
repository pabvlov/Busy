import { Component, Host, Input } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { ApplicationComponent } from '../application.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  constructor(private workService: WorkService, @Host() private app: ApplicationComponent) { }
  @Input() pos = 0;

  get services() {
    return this.workService.services;
  }

  showMore() {
    this.app.showingInfo = !this.app.showingInfo;
  }
}
