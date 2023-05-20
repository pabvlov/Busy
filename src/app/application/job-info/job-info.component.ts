import { Component, Input } from '@angular/core';
import { WorkInformation } from 'src/app/interfaces/work-information';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {

  @Input()
  job!: WorkInformation;

  mapskey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDa4NeSZREAb_IGxYJ6Z_5FDuCM2VWHyMQ&q="
  constructor(private userService: UserService) { 

  }

  getUbicacion() {
    return this.userService._usuario.direccion
  }

}
