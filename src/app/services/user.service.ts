import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Session } from '../interfaces/session';
import { map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from '../interfaces/api-response';
import { Profile } from '../interfaces/profile';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserInformation } from '../interfaces/user-information';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn: boolean = false; // variable para saber si el usuario está logueado

  // inicializamos el objeto usuario con valores por defecto
  

  public _usuario: UserInformation = {
    "usuario":{
       "dv":5,
       "rut": null!,
       "foto": "",
       "mail":"pablojavierprietocepeda@gmail.com",
       "nombres":"",
       "apellidos":"Error",
       "direccion":"",
       "ultima_visita": new Date("2023-05-16"),
       "fecha_registro": new Date("2023-05-16 12:09:23"),
       "fecha_nacimiento": new Date("2000-07-07T04:00:00.000Z")
    },
    "trabajos":[
       {
          "id":3,
          "foto":"1684560833479-mrlapaditeaxe.webp",
          "precio":"6336000",
          "titulo":"Desarrollador Web Angular y NodeJS",
          "ubicacion": null!,
          "descripcion":"La solución desde el lado informático podría ser el desarrollo de una aplicación o plataforma\r\nen línea que permita a los usuarios publicar y buscar trabajos puntuales de distintos rubros.\r\nLa aplicación podría contar con un sistema de búsqueda por ubicación, habilidades,\r\nexperiencia, horarios disponibles, y otras características relevantes para ayudar a los\r\nusuarios a encontrar trabajos y trabajadores que se ajusten a sus necesidades.",
          "postulantes":[
             {
                "rut_trabajador":20247706,
                "estado_postulacion":1,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             },
             {
                "rut_trabajador":20067953,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             }
          ],
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion": new Date("2023-05-20 05:33:53.000000"),
          "fecha_finalizacion": new Date("2023-05-31 04:00:00.000000"),
          "fecha_seleccion_postulante": new Date("2023-05-21 04:00:00.000000")
       },
       {
          "id":4,
          "foto":"1684566906468-24236613-cortadora-de-cÃ©sped-trabajador-hombre-cortando-el-cÃ©sped-en-el-campo-verde.webp",
          "precio":"30000",
          "titulo":"Cortar pasto",
          "ubicacion":null,
          "descripcion":"Hay que cortar una superficie de 100metros x 10 metros, recibo ofertas",
          "postulantes":[
             {
                "rut_trabajador":20247706,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             },
             {
                "rut_trabajador":20703935,
                "estado_postulacion":2,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             }
          ],
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion":new Date("2023-05-20 07:15:06.000000"),
          "fecha_finalizacion":new Date("2023-05-22 04:00:00.000000"),
          "fecha_seleccion_postulante":new Date("2023-05-21 04:00:00.000000")
       },
       {
          "id":10,
          "foto":"1685379872332-husky-siberiano-sentado-en-el-jardÃ­n-770x470.jpg",
          "precio":"20000",
          "titulo":"Cuidar perro de casa grande",
          "ubicacion":"Perrolandia",
          "descripcion":"Se debe cuidar un husky, sus observaciones:\r\nAlimentación: Hasta los tres meses de vida tu husky debe comer tres veces al día, por lo que reparte la cantidad diaria que te recomiende el veterinario en tres tomas. Entre los tres y los nueve meses hazlo en dos tomas y tras los nueve meses, solo necesitará alimentarse una vez al día. ",
          "postulantes":[
             {
                "rut_trabajador":20247706,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             },
             {
                "rut_trabajador":20703935,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             }
          ],
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion":new Date("2023-05-29 17:04:32.000000"),
          "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
          "fecha_seleccion_postulante":new Date("2023-05-31 04:00:00.000000")
       },
       {
          "id":11,
          "foto":"1685556614912-R.jpg",
          "precio":"20000",
          "titulo":"Limpiar vidrios",
          "ubicacion":"Las Rosas 110, Quilpué",
          "descripcion":"Necesito limpiar los ventanales de mi departamento.",
          "postulantes":[
             {
                "rut_trabajador":7419310,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             },
             {
                "rut_trabajador":20703935,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             }
          ],
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion":new Date("2023-05-31 18:10:15.000000"),
          "fecha_finalizacion":new Date("2023-06-10 04:00:00.000000"),
          "fecha_seleccion_postulante":new Date("2023-06-04 04:00:00.000000")
       },
       {
          "id":13,
          "foto":"1686095585974-OIP.jpg",
          "precio":"40000",
          "titulo":"Cortar madera",
          "ubicacion":"INACAP Valparaiso",
          "descripcion":"Necesito cortar madera",
          "postulantes":null,
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion":new Date("2023-06-06 23:53:06.000000"),
          "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
          "fecha_seleccion_postulante":new Date("2023-07-06 04:00:00.000000")
       },
       {
          "id":14,
          "foto":"1686367496957-DAK3HnwUwAAvi5S.jpg",
          "precio":"800000",
          "titulo":"Necesito fotógrafo para boda",
          "ubicacion":"Las Rosas 110, Quilpué",
          "descripcion":"Hola, necesito un fotógrafo para una boda de aproximadamente 400 personas y quiero sacar mínimo unas 1500 fotos épicas pero así muy épicas porfavor",
          "postulantes":[
             {
                "rut_trabajador":20703935,
                "estado_postulacion":3,
                "trabajador":{
                  "dv":2,
                  "rut":20247706,
                  "foto":"1685291171171-naxiti.png",
                  "mail":"",
                  "nombres":"Nicolas Andres ",
                  "apellidos":"Diaz Garces",
                  "direccion":"blanco encalada 1575 ",
                  "ultima_visita":new Date("2023-05-28"),
                  "fecha_registro":new Date("2023-05-28 01:01:17"),
                  "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
             }
             }
          ],
          "rut_empleador":20482869,
          "cantidad_personas":"1",
          "fecha_publicacion":new Date("2023-06-10 03:24:57.000000"),
          "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
          "fecha_seleccion_postulante":new Date("2023-07-03 04:00:00.000000")
       }
    ],
    "servicios":[
       {
          "id":3,
          "foto":"1685986964346-f.elconfidencial.com_original_b53_f0f_474_b53f0f474a89728972d9e3610bba5dea.jpg",
          "precio":5000,
          "titulo":"Limpiador de Baños",
          "descripcion":"El servicio consiste en limpiar baños, cada baño cuesta $5.000 y en caso de estar muy indecente se cobra $15.000."
       },
       {
          "id":5,
          "foto":"1686007872004-7d873be61ebb8fab484295ca2cddb6371fe8a7ab.bin.jpg",
          "precio":5000,
          "titulo":"Clases particulares PTU",
          "descripcion":"Ofrezco clases particulares de matemática de lunes a sábado entre 13:00 a 18:00. Más material complementario y revisión de ensayos. Precio por hora"
       }
    ],
    "postulaciones":[
       {
          "id":64,
          "trabajo":{
             "id":12,
             "foto":"1686039999735-depositphotos_60927629-stock-photo-handyman-fixing-a-washing-machine.jpg",
             "precio":"30000",
             "titulo":"Necesito arreglar lavadora",
             "ubicacion":"Las Rosas 110, Quilpué",
             "descripcion":"Tengo una lavadora que se le echó a perder la bomba, necesito que alguien me pueda hacer la pega",
             "postulantes":[
                {
                   "rut_trabajador":20482869,
                   "estado_postulacion":1,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                }
                },
                {
                   "rut_trabajador":20703935,
                   "estado_postulacion":3,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                }
                }
             ],
             "rut_empleador":20067953,
             "cantidad_personas":"1",
             "fecha_publicacion":new Date("2023-06-06 08:26:40.000000"),
             "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
             "fecha_seleccion_postulante":new Date("2023-06-23 04:00:00.000000")
          },
          "empleador":{
             "dv":9,
             "rut":20067953,
             "foto":"1685290172452-miamor.png",
             "mail":"mpalburquenque@gmail.com",
             "nombres":"Maria Paz",
             "apellidos":"Alburquenque Letelier",
             "direccion":"Sor teresa de los andes #757, lomas del sol",
             "ultima_visita":new Date("2023-05-20"),
             "fecha_registro":new Date("2023-05-20 20:59:42"),
             "fecha_nacimiento":new Date("1999-08-07T04:00:00.000Z")
          },
          "id_estado":1,
          "fecha_publicacion":new Date("2023-06-11 15:08:00.000000")
       },
       {
          "id":65,
          "trabajo":{
             "id":7,
             "foto":"1685235939299-Screenshot_1.png",
             "precio":"24569",
             "titulo":"Personas de baja estatura",
             "ubicacion":null,
             "descripcion":"Se está organizando una fiesta temática de fantasía y necesito incorporar enanos de diferentes maneras para gregar diversión y ambiente.\r\n- La idea es que puedan dar la bienvenida a los invitados, socializar de manera amigable y entretenida.\r\n- Se organizarán juegos y competencias inspirados en las habilidades atribuidas a los enanos en la ficción, he de especificar que se tomarán las medidas para que los juegos sean seguros y adecuados para el espacio de la fiesta.\r\n- Deberá ofrecer bocadillos y bebidas a los invitados como \"Pociones Mágicas\" en vasos de corados, \"Panecillos mineros\" como aperitivos y postres con nombres divertidos.",
             "postulantes":[
                {
                   "rut_trabajador":20247706,
                   "estado_postulacion":1,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                }
                },
                {
                   "rut_trabajador":20482869,
                   "estado_postulacion":1,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                }
                }
             ],
             "rut_empleador":20247706,
             "cantidad_personas":"5",
             "fecha_publicacion":new Date("2023-05-28 01:05:39.000000"),
             "fecha_finalizacion":new Date("2023-07-07 04:00:00.000000"),
             "fecha_seleccion_postulante":new Date("2023-06-21 04:00:00.000000")
          },
          "empleador":{
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
          "id_estado":1,
          "fecha_publicacion":new Date("2023-06-11 15:08:04.000000")
       },
       {
          "id":66,
          "trabajo":{
             "id":5,
             "foto":"1684615894748-c_img_740x370.ea3xf91k2alsmup.jpg",
             "precio":"50000",
             "titulo":"Lavar autos",
             "ubicacion":null,
             "descripcion":"Necesito que se laven autos afuera de mi casa, son aproximandamente 15 autos por día y cada auto se demora aproximadamante 20 minutos en lavar.",
             "postulantes":[
                {
                   "rut_trabajador":20703935,
                   "estado_postulacion":2,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                }
                },
                {
                   "rut_trabajador":20482869,
                   "estado_postulacion":1,
                   "trabajador":{
                     "dv":2,
                     "rut":20247706,
                     "foto":"1685291171171-naxiti.png",
                     "mail":"",
                     "nombres":"Nicolas Andres ",
                     "apellidos":"Diaz Garces",
                     "direccion":"blanco encalada 1575 ",
                     "ultima_visita":new Date("2023-05-28"),
                     "fecha_registro":new Date("2023-05-28 01:01:17"),
                     "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                  } 
                },
                {
                   "rut_trabajador":20247706,
                   "estado_postulacion":3,
                   "trabajador":{
                        "dv":2,
                        "rut":20247706,
                        "foto":"1685291171171-naxiti.png",
                        "mail":"",
                        "nombres":"Nicolas Andres ",
                        "apellidos":"Diaz Garces",
                        "direccion":"blanco encalada 1575 ",
                        "ultima_visita":new Date("2023-05-28"),
                        "fecha_registro":new Date("2023-05-28 01:01:17"),
                        "fecha_nacimiento":new Date("1999-07-20T04:00:00.000Z")
                   }
                        
                }
             ],
             "rut_empleador":20703935,
             "cantidad_personas":"1",
             "fecha_publicacion":new Date("2023-05-20 20:51:34.000000"),
             "fecha_finalizacion":new Date("2023-05-22 04:00:00.000000"),
             "fecha_seleccion_postulante":new Date("2023-05-21 04:00:00.000000")
          },
          "empleador":{
             "dv":7,
             "rut":20703935,
             "foto":"1684553318415-Screenshot_1.png",
             "mail":"seba20012013@gmail.com",
             "nombres":"Sebastian Jamon",
             "apellidos":"Mena Cordova",
             "direccion":null,
             "ultima_visita":new Date("2023-05-19"),
             "fecha_registro":new Date("2023-05-19 23:27:16"),
             "fecha_nacimiento":new Date(null!)
          },
          "id_estado":1,
          "fecha_publicacion":new Date("2023-06-11 15:08:08.000000")
       }
    ]
 }; // objeto usuario para uso exclusivo de este .ts

  setFoto(foto: string) {
    this._usuario.usuario.foto = foto;
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  getUsers(): any {
    let users = this.httpClient.get(environment.apiUrl + 'users');
    return users;
  }

  getUserByRut(rut: string): any {
    let splitRut = rut.split('-');
    let dv = splitRut[1];
    rut = splitRut[0];
    if (dv == undefined) {
      dv = "-1";
    }
    let user = this.httpClient.get<ApiResponse>(environment.apiUrl + `user/${rut}/${dv}`);    
    return user.pipe(
      tap( resp => {
        if( resp.ok ) 
        console.log(resp);
        {
          return resp.content;
        }
      } ),
      map( resp => resp )
    );
  }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    localStorage.removeItem('token')
    this.router.navigate(['/'], { skipLocationChange: false });
    window.location.reload();
  }

  getProfileByRut(rut: string): any {
    let splitRut = rut.split('-');
    let dv = splitRut[1];
    rut = splitRut[0];
    if (dv == undefined) {
      dv = "-1";
    }
    let user = this.httpClient.get<ApiResponse>(environment.apiUrl + `user/profile/${rut}/${dv}`);    
    return user.pipe(
      tap( resp => {
        if( resp.ok ) {
          return resp.content;
        }
      } ),
      map( resp => resp )
    );
  }

  registerUser(rut: string, nombres: string, apellidos: string, mail: string, password: string): any {
    let rutArray = rut.split('-');
    rut = rutArray[0];
    let dv = rutArray[1];
    let register = this.httpClient.post(environment.apiUrl + 'auth/register', { rut, dv, nombres, apellidos, mail, password })
    return register;
  }

  getSession(rut: string, password: string) { // loguear al usuario
    const url = environment.apiUrl + `auth/login`
    const body = { rut, password }
    return this.httpClient.post<Session>(url, body)
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.content.token!) // guardamos el jwt en localstorage
            this._usuario = resp.content.user // le asignamos al usuario la response

            this.loggedIn = true; // seteamos la variable loggedIn a true
          }
        } ),
        map( resp => resp )
      )
  }

  renewSession() {
    const url = environment.apiUrl + `auth/renew`    
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token') } )
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.content.token!) // guardamos el jwt en localstorage
            const { user, token } = resp.content
            this._usuario = user
          }
        } ) 
      )
  }

  getUserDataFromToken() {
    const url = environment.apiUrl + `auth/renew`    
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token') } )
  }

  regenerateSession() {
    const url = environment.apiUrl + `auth/regenerate`    
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token') } )
      .pipe(
        tap( resp => {
          console.log(resp);
          
          if( resp.ok ) {
            const { user, token } = resp.content // destructuring de la response
            localStorage.setItem('token', token!) // guardamos el jwt en localstorage

            this._usuario = user
            
          } else console.log(resp);
        } ) 
      )
  }

  getUpdatedUserData() {
    const url = environment.apiUrl + `auth/regenerate`    
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token') } )
  }

  _session() {
    const url = environment.apiUrl + `auth/renew`  
    let session = false
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token') } )
      .pipe(
        tap( resp => {

        } ),
        map( resp => resp.ok ) 
      )
  }

  public isAuthenticated(): boolean { // método para saber si el usuario está logueado
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      return !helper.isTokenExpired(token);
    }
    return false;
  }

  uploadProfilePicture(rut: string, file: File) {  
    const body = new FormData();
    body.append('rut', rut);
    body.append('file', file);
    this._usuario.usuario.foto = file.name;
    return this.httpClient.post(environment.apiUrl + 'user/upload', body);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
          });
    });
  }

  updateUser(user: any) {
    const rut = user.value.rut.split('-')[0];
    const dv = user.value.rut.split('-')[1];
    return this.httpClient.put(environment.apiUrl + `user/edit`, user.value);
  }

  setSession(user: UserInformation, password: string = null!) {
   if (password == null) {
      localStorage.setItem('password', "")
   } else localStorage.setItem('password', password)
   this._usuario = user;
   }
}
