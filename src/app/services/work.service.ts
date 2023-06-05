import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges } from '@angular/core';
import { Work } from '../interfaces/work';
import { ApiResponse } from '../interfaces/api-response';
import { Jobs } from '../interfaces/jobs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { WorkInformation } from '../interfaces/work-information';
import { ServiceInformation } from '../interfaces/service-information';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  ready = false;

  isUpdating = true;
  isUpdatingProfile = true;

  updateWorks() {
    this.isUpdating = true;
    this.getWorks().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.jobs = data.content;
        this.isUpdating = false;
        
        this.ready = true;
        console.log(data.content);
        
      } else {
        console.log(data.message);
      }
    })
  }

  updateProfileWork(id: number) {
    this.isUpdatingProfile = true;
    this.getWork(id).subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.work = data.content;
        this.isUpdatingProfile = false;
        
        console.log(data.content);
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
  services: ServiceInformation[] = [
    {
        id: 1,
        titulo: 'Desarrollador Web',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        rut_usuario: 20482869,
        foto: '1684560833479-mrlapaditeaxe.webp',
        precio: 6350000,
      }
  ]

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

  work: WorkInformation = {
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


  getUserInfo() {
    console.log(this.jobs[this.pos].work.rut_empleador);
    
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

  uploadService(body: FormData) {
    return this.httpClient.post('http://localhost:3000/service/add', body);
  }

  getServices() {
    return this.httpClient.get<ApiResponse>('http://localhost:3000/services');
  }

  getService(id: number) {
    return this.httpClient.get<ApiResponse>(`http://localhost:3000/service/${id}`);
  }

  hire(id_trabajo: number, rut_trabajador: number) {
    
    return this.httpClient.post<ApiResponse>(`http://localhost:3000/service/hire/`, { id_trabajo, rut_trabajador });
  }

  


  
}
