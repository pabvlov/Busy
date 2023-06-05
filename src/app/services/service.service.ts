import { Injectable } from '@angular/core';
import { ServiceInformation } from '../interfaces/service-information';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  pos: number = 0;

  prev() {
    if (this.pos > 0) this.pos--;
  }

  next() {
    if (this.services.length - 1 > this.pos) {
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

  updateServices() {
    this.getServices().subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.services = data.content;
        
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
