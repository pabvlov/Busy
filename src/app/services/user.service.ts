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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn: boolean = false; // variable para saber si el usuario está logueado

  // inicializamos el objeto usuario con valores por defecto
  

  public _usuario: User = {
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
  }; // objeto usuario para uso exclusivo de este .ts

  setFoto(foto: string) {
    this._usuario.foto = foto;
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
            //this._usuario = resp.content // le asignamos al usuario la response

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
            const { rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin } = user

            this._usuario = {
              rut: +rut,
              dv: +dv!,
              nombres: nombres!,
              apellidos: apellidos!,
              mail: mail!,
              foto: foto!,
              direccion: direccion!,
              esAdmin: +esAdmin!,
              fecha_nacimiento: fecha_nacimiento!,
              fecha_registro: fecha_registro!,
              ultima_visita: ultima_visita!,
              aprobado: {
                type: aprobado!.type,
                data: aprobado!.data
              }
            } 
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
          if( resp.ok ) {
            const { user, token } = resp.content // destructuring de la response
            localStorage.setItem('token', token) // guardamos el jwt en localstorage
            const { rut, dv, nombres, apellidos, foto, mail, direccion, fecha_nacimiento, fecha_registro, ultima_visita, aprobado, esAdmin } = user // destructuring del objeto user

            this._usuario = {
              rut: +rut,
              dv: +dv!,
              nombres: nombres!,
              apellidos: apellidos!,
              mail: mail!,
              foto: foto!,
              direccion: direccion!,
              esAdmin: +esAdmin!,
              fecha_nacimiento: fecha_nacimiento!,
              fecha_registro: fecha_registro!,
              ultima_visita: ultima_visita!,
              aprobado: {
                type: aprobado!.type,
                data: aprobado!.data
              }
            } 
            
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
    this._usuario.foto = file.name;
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
}
