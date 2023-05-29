import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { UserService } from './user.service';
import { WorkInformation } from '../interfaces/work-information';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  ready = false;

  isUpdating = true;

  updateWorks() {
    this.isUpdating = true;
    this.getWorks().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.jobs = data.content;
        this.isUpdating = false;
        this.ready = true;
      } else {
        console.log(data.message);
      }
    })
  }

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  pos = 0;

  prev() {
    if (this.pos > 0) this.pos--;
  }

  next() {
    if (this.jobs.length - 1 > this.pos) {
      this.pos++;
    }    
  }

   jobs: WorkInformation[] = [
    {
      work: {
        id: 1,
        titulo: 'Desarrollador Web',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        rut_empleador: 20482869,
        foto: '1684560833479-mrlapaditeaxe.webp',
        cantidad_personas: '1',
        ubicacion: null,
        fecha_publicacion: new Date(),
        fecha_seleccion_postulante: new Date(),
        fecha_finalizacion: new Date(),
        precio: null
      },
      appliers: [
        {
          rut: 20482869,
          foto: "1684551595444-Screenshot_2.png",
          nombres: "Pablo",
          apellidos: "Prieto",
          direccion: "Las Rosas 110, Quilpué",
          fecha_publicacion: new Date("2023-05-27T21:01:35.000Z")
        }
      ]
    }
  ];

  getUserInfo() {
    return this.userService.getUserByRut(`${this.jobs[this.pos].work.rut_empleador}`);
  }

  uploadWork(body: FormData) {
    return this.httpClient.post('http://localhost:3000/work/add', body);
  }

  getWorks() {
    return this.httpClient.get<ApiResponse>('http://localhost:3000/works');
  }

  getWork(id: number) {
    return this.httpClient.get<ApiResponse>(`http://localhost:3000/work/${id}`);
  }

  applyWork(id_trabajo: number, rut_trabajador: number) {
    return this.httpClient.post<ApiResponse>(`http://localhost:3000/work/apply/`, { id_trabajo, rut_trabajador });
  }

  


  
}
