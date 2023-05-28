import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { Observable } from 'rxjs';
import { Work } from 'src/app/interfaces/work';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { WorkInformation } from 'src/app/interfaces/work-information';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { UtilsService } from 'src/app/services/utils.service';
import { Jobs } from 'src/app/interfaces/jobs';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss']
})
export class TrabajoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private workService: WorkService, private userService: UserService, private utils: UtilsService) { }

  id: number = +this.route.snapshot.paramMap.get('id')!;

  job: Jobs = {
    id: 0,
    titulo: '',
    descripcion: '',
    rut_empleador: 0,
    foto: '',
    cantidad_personas: '',
    ubicacion: null,
    fecha_publicacion: new Date(),
    fecha_seleccion_postulante: new Date(),
    fecha_finalizacion: new Date(),
    precio: null
  }

  empleador = this.userService._usuario;

  ngOnInit(): void {
    this.work();
  }

  work(): any {
    
    this.workService.getWork(this.id).subscribe((data: ApiResponse) => {
      console.log(data);
      
      if (data.ok) {
        this.job = data.content.work[0]
        return data.content.work[0];
      } else {
        console.log(data.message);
        return null!;
      }
    })
  }

  dateDiff(date: Date) {
    return this.utils.dateDiff(date);
  }

  getUserInfo() {
    return this.userService.getUserByRut(this.job.rut_empleador.toString())
  }
}
