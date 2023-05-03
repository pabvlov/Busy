import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Session } from '../interfaces/session';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usuario: User = {
    rut: '',
    nombres: '',
    apellidos: '',
    mail: '',
    foto: ''
  }; // objeto usuario para uso exclusivo de este .ts

  constructor(private httpClient: HttpClient) { }

  getUsers(): any {
    let users = this.httpClient.get('http://localhost:3000/users');
    return users;
  }

  getUserByRut(rut: string): any {
    let splitRut = rut.split('-');
    let dv = splitRut[1];
    rut = splitRut[0];
    let user = this.httpClient.get(`http://localhost:3000/user/${rut}/${dv}`);
    return user;
  }

  registerUser(rut: string, nombres: string, apellidos: string, mail: string, password: string): any {
    let rutArray = rut.split('-');
    rut = rutArray[0];
    let dv = rutArray[1];
    let register = this.httpClient.post('http://localhost:3000/auth/register', { rut, dv, nombres, apellidos, mail, password })
    return register;
  }

  getSession(rut: string, password: string) { // loguear al usuario
    const url = `http://localhost:3000/auth/login`
    const body = { rut, password }
    return this.httpClient.post<Session>(url, body)
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.content.token!) // guardamos el jwt en localstorage
            
            this._usuario = {
              rut: resp.content.rut,
              nombres: resp.content.nombres!,
              apellidos: resp.content.apellidos!,
              mail: resp.content.mail!,
              foto: resp.content.foto!
            } // le asignamos al usuario la response
          }
        } ),
        map( resp => resp.ok )
      )
  }

  renewSession() {
    const url = `http://localhost:3000/auth/renew`
    return this.httpClient.post<Session>(url, { token: localStorage.getItem('token')! } )
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            localStorage.setItem('token', resp.content.token!) // guardamos el jwt en localstorage
            
            this._usuario = {
              rut: resp.content.rut,
              nombres: resp.content.nombres!,
              apellidos: resp.content.apellidos!,
              mail: resp.content.mail!,
              foto: resp.content.foto!
            } // le asignamos al usuario la response
          }
        } ),
        map( resp => resp.ok )
      )
  }

}
