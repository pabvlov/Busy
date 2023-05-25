import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../interfaces/work';
import { ApiResponse } from '../interfaces/api-response';
import { Jobs } from '../interfaces/jobs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  updateWorks() {
    this.getWorks().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.jobs = data.content;
      } else {
        console.log(data.message);
      }
    })
  }

  constructor(private httpClient: HttpClient) { }

  pos = 0;

  prev() {
    if (this.pos > 0) this.pos--;
  }

  next() {
    if (this.jobs.length - 1 > this.pos) {
      this.pos++;
    }    
  }

  jobs: Jobs[] = [
    {
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
    }
  ];

  uploadWork(body: FormData) {
    return this.httpClient.post('http://localhost:3000/work/add', body);
  }

  getWorks() {
    return this.httpClient.get<ApiResponse>('http://localhost:3000/works');
  }

  
}
