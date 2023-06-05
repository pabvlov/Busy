import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WorkInformation } from 'src/app/interfaces/work-information';
import { Jobs } from 'src/app/interfaces/jobs';
import { Applier } from 'src/app/interfaces/applier';
import { MapsService } from 'src/app/services/maps.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {


  constructor(private route: ActivatedRoute, 
              private router: Router,
              private workService: WorkService, 
              private userService: UserService, 
              private utils: UtilsService,
              private maps: MapsService,
              private swal: SwalService) {}


  id: number = +this.route.snapshot.paramMap.get('id')!;

  get ready() {
    return this.workService.isUpdatingProfile;
  }

  get work(): Jobs {
    return this.workService.work.work;
  }

  get appliers(): Applier[] {
    return this.workService.work.appliers;
  }

  get mapskey() {
    return this.maps.mapskey;
  }

  empleador = this.userService._usuario;

  ngOnInit(): void {
    this.workService.updateProfileWork(this.id);
  }

  dateDiff(date: Date) {
    return this.utils.dateDiff(date);
  }

  getUserInfo() {
    return this.userService.getUserByRut(this.work.rut_empleador.toString())
  }

  goBack() {
    this.router.navigate(['/app/profile']);
  }

  handleDeleteWork() {
    this.workService.deleteWork(this.id).subscribe( resp => {
      this.swal.loading('Eliminando trabajo...');
      if (resp.ok) {
        this.swal.stopLoading();
        this.router.navigate(['/app/profile']);
      }
      
    })
    //this.router.navigate(['/app/profile']);
  }
}
