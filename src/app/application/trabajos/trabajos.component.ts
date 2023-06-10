import { Component, Input, Host } from '@angular/core';
import { Jobs } from 'src/app/interfaces/jobs';
import { WorkService } from 'src/app/services/work.service';
import { ApplicationComponent } from '../application.component';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss']
})
export class TrabajosComponent {

  constructor(private workService: WorkService, @Host() private app: ApplicationComponent) { }
  @Input() pos = 0;

  get jobs() {
    return this.workService.jobs;
  }

  showMore() {
    this.app.showingInfo = !this.app.showingInfo;
  }

  get foto() {
    return !!this.jobs[this.pos].foto ? this.jobs[this.pos].foto : 'app/defaultprofilepic.png';
  }

}
