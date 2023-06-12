import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges } from '@angular/core';
import { Work } from '../interfaces/work';
import { ApiResponse } from '../interfaces/api-response';
import { Jobs } from '../interfaces/jobs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { WorkInformation } from '../interfaces/work-information';
import { ServiceInformation } from '../interfaces/service-information';
import { SwalService } from './swal.service';

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

  updateProfileWork(id: number, isUpdatingProfile: boolean = true) {
    this.isUpdatingProfile = isUpdatingProfile;
    this.getWork(id).subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.work = data.content;
        this.isUpdatingProfile = false;
        this.swal.stopLoading();
        console.log(data.content);
      } else {
        console.log(data.message);
      }
    })
  }

  handleDeleteWork(id: number) {
    this.deleteWork(id).subscribe((data: ApiResponse) => {
      if (data.ok) {
        this.updateWorks();
      } else {
        this.swal.error('', data.message);
      }
    })
  }

  constructor(private httpClient: HttpClient, private userService: UserService, private swal: SwalService) { }

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
         "id":7,
         "foto":"1685235939299-Screenshot_1.png",
         "precio":"24569",
         "titulo":"Personas de baja estatura",
         "empleador":{
            rut: 0,
            dv: 0,
            nombres: '',
            apellidos: '',
            mail: '',
            foto: '',
            direccion: null,
            esAdmin: 0,
            fecha_nacimiento: null,
            fecha_registro: new Date(),
            ultima_visita: new Date(),
            ubicacion: undefined,
            aprobado: {
              type: '',
              data: []
            }
         },
         "ubicacion":null!,
         "descripcion":"Se está organizando una fiesta temática de fantasía y necesito incorporar enanos de diferentes maneras para gregar diversión y ambiente.\r\n- La idea es que puedan dar la bienvenida a los invitados, socializar de manera amigable y entretenida.\r\n- Se organizarán juegos y competencias inspirados en las habilidades atribuidas a los enanos en la ficción, he de especificar que se tomarán las medidas para que los juegos sean seguros y adecuados para el espacio de la fiesta.\r\n- Deberá ofrecer bocadillos y bebidas a los invitados como \"Pociones Mágicas\" en vasos de corados, \"Panecillos mineros\" como aperitivos y postres con nombres divertidos.",
         "postulaciones":[
            {
               "id":42,
               "user":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"nicolasdiazgarces18@gmail.com",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
               },
               "id_estado":3,
               "id_trabajo":7,
               "rut_trabajador":20247706,
               "fecha_publicacion": new Date("2023-05-29 19:34:19.000000")
            },
            {
               "id":44,
               "user":{
                  "dv":5,
                  "rut":20482869,
                  "foto":"1684551595444-Screenshot_2.png",
                  "mail":"pablojavierprietocepeda@gmail.com",
                  "nombres":"Pablo",
                  "apellidos":"Prieto",
                  "direccion":"Las Rosas 110, Quilpué",
                  "ultima_visita": new Date("2023-05-16"),
                  "fecha_registro": new Date("2023-05-16 12:09:23"),
                  "fecha_nacimiento": new Date("2000-07-07T04:00:00.000Z")
               },
               "id_estado":3,
               "id_trabajo":7,
               "rut_trabajador":20482869,
               "fecha_publicacion": new Date("2023-06-05 02:40:41.000000")
            }
         ],
         "rut_empleador":20247706,
         "cantidad_personas":"5",
         "fecha_publicacion":new Date("2023-05-28 01:05:39.000000"),
         "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
         "fecha_seleccion_postulante": new Date("2023-06-21 04:00:00.000000")
      }
   ]

  work: WorkInformation = {
    "id":7,
    "foto":"1685235939299-Screenshot_1.png",
    "precio":"24569",
    "titulo":"Personas de baja estatura",
    "empleador":{
       rut: 0,
       dv: 0,
       nombres: '',
       apellidos: '',
       mail: '',
       foto: '',
       direccion: null,
       esAdmin: 0,
       fecha_nacimiento: null,
       fecha_registro: new Date(),
       ultima_visita: new Date(),
       ubicacion: undefined,
       aprobado: {
         type: '',
         data: []
       }
    },
    "ubicacion":null!,
    "descripcion":"Se está organizando una fiesta temática de fantasía y necesito incorporar enanos de diferentes maneras para gregar diversión y ambiente.\r\n- La idea es que puedan dar la bienvenida a los invitados, socializar de manera amigable y entretenida.\r\n- Se organizarán juegos y competencias inspirados en las habilidades atribuidas a los enanos en la ficción, he de especificar que se tomarán las medidas para que los juegos sean seguros y adecuados para el espacio de la fiesta.\r\n- Deberá ofrecer bocadillos y bebidas a los invitados como \"Pociones Mágicas\" en vasos de corados, \"Panecillos mineros\" como aperitivos y postres con nombres divertidos.",
    "postulaciones":[
       {
          "id":42,
          "user":{
             "dv":2,
             "rut":20247706,
             "foto":"1685291171171-naxiti.png",
             "mail":"nicolasdiazgarces18@gmail.com",
             "nombres":"Nicolas Andres ",
             "apellidos":"Diaz Garces",
             "direccion":"blanco encalada 1575 ",
             "ultima_visita": new Date("2023-05-28"),
             "fecha_registro": new Date("2023-05-28 01:01:17"),
             "fecha_nacimiento": new Date("1999-07-20T04:00:00.000Z")
          },
          "id_estado":3,
          "id_trabajo":7,
          "rut_trabajador":20247706,
          "fecha_publicacion": new Date("2023-05-29 19:34:19.000000")
       },
       {
          "id":44,
          "user":{
             "dv":5,
             "rut":20482869,
             "foto":"1684551595444-Screenshot_2.png",
             "mail":"pablojavierprietocepeda@gmail.com",
             "nombres":"Pablo",
             "apellidos":"Prieto",
             "direccion":"Las Rosas 110, Quilpué",
             "ultima_visita": new Date("2023-05-16"),
             "fecha_registro": new Date("2023-05-16 12:09:23"),
             "fecha_nacimiento": new Date("2000-07-07T04:00:00.000Z")
          },
          "id_estado":3,
          "id_trabajo":7,
          "rut_trabajador":20482869,
          "fecha_publicacion": new Date("2023-06-05 02:40:41.000000")
       }
    ],
    "rut_empleador":20247706,
    "cantidad_personas":"5",
    "fecha_publicacion":new Date("2023-05-28 01:05:39.000000"),
    "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
    "fecha_seleccion_postulante": new Date("2023-06-21 04:00:00.000000")
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

  deleteWork(id: number) {
    return this.httpClient.delete<ApiResponse>(`http://localhost:3000/work/delete/${id}`);
  }

  chooseApplierWork(id_trabajo: number, rut_trabajador: number, state: number) {
    return this.httpClient.put<ApiResponse>(`http://localhost:3000/work/choose`, { id_trabajo, rut_trabajador, state });
  }
  

  


  
}
