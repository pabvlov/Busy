import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  pos: number = 0;
  ready: boolean = false;

  prev() {
    if (this.pos > 0) this.pos--;
  }

  next() {
    if (this.services.length - 1 > this.pos) {
      this.pos++;
    }    
  }

  services: Service[] = [
    {
        id: 1,
        titulo: 'Desarrollador Web',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        rut_usuario: 20482869,
        foto: '1684560833479-mrlapaditeaxe.webp',
        precio: 6350000,
        user: {
          rut: 20482869,
          nombres: 'Jorge',
          apellidos: 'Gonzalez',
          mail: '',
          dv: 0,
          foto: '1684560833479-mrlapaditeaxe.webp',
          fecha_nacimiento: new Date(),
          fecha_registro: new Date(),
          ultima_visita: new Date(),
          direccion: '',
      }
    }
  ]

  updateServices() {
    this.ready = false;
    this.getServices().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.services = data.content;
        this.ready = true;
        console.log(data.content);
      } else {
        console.log(data.message);
      }
    })
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
