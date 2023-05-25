import { Component, Input } from '@angular/core';
import { Jobs } from 'src/app/interfaces/jobs';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss']
})
export class TrabajosComponent {

  constructor(private workService: WorkService) { }
  @Input() pos = 0;

  get jobs() {
    return this.workService.jobs;
  }

}
