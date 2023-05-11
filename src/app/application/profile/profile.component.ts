import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnInit {

  constructor( private userService: UserService, private fb: FormBuilder ) {}

  get rut() {
    return this.userService._usuario.rut + '-' + this.userService._usuario.dv;
  }

  get nombre() {
    return this.userService._usuario.nombres + ' ' + this.userService._usuario.apellidos;
  }

  get nombres() {
    return this.userService._usuario.nombres;
  }

  get apellidos() {
    return this.userService._usuario.apellidos;
  }

  get mail() {
    return this.userService._usuario.mail;
  }

  userData = this.fb.group({
    rut: [this.rut, {disabled: true}],
    nombres: [this.userService._usuario.nombres],
    apellidos: [this.userService._usuario.apellidos],
    mail: [this.userService._usuario.mail],
    ubicacion: ['Las Rosas 110, Quilpue']
  });

  ubicacion: String = ''

  setUbicacion(ubicacion: String) {
    this.ubicacion = ubicacion;
  }

  getUbicacion() {
    return this.ubicacion;
  }

  get profilePicture() {
    return !!this.userService._usuario.foto ? "http://localhost:3000/" + this.userService._usuario.foto : '../../../assets/img/defaultprofilepic.png';
  }

  ngOnInit(): void {
    this.userData.valueChanges.subscribe( data => {
      this.setUbicacion(data.ubicacion!);
    })
    this.setUbicacion(this.userData.value.ubicacion!);
  }

  picture: any = new Event('');

  handlePicture(event: Event) {
    this.picture = event;
    this.handleProfile();
  }

  handleProfile(){
    const formData = new FormData();
    formData.append('rut', this.userService._usuario.rut.toString());
    if (this.picture.target.files![0] == '') {
      console.log('No se selecciono ningun archivo');
    } else {
      this.userService.uploadProfilePicture(this.userService._usuario.rut.toString(), this.picture.target.files[0]).subscribe( (resp: any) => {
        this.userService.regenerateSession().subscribe();
      });
    }
  }

  ngAfterViewInit(): void {
    console.log(this.userService._usuario);
  }
}
