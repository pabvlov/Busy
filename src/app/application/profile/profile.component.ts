import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ApiResponse } from '../../interfaces/api-response';
import { Session } from 'src/app/interfaces/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

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

  get direccion() {
    const { direccion } = this.userService._usuario;
    if(direccion === 'undefined' || direccion === null || direccion === '') {
      this.userService.getPosition().then(pos => {
          return pos.lat + ',' + pos.lng;
        })
      }
      return direccion;
  }
    

  get fecha_nacimiento() {
    return this.userService._usuario.fecha_nacimiento;
  }

  get ultima_visita() {
    return this.userService._usuario.ultima_visita;
  }

  get fecha_registro() {
    return this.userService._usuario.fecha_registro;
  }

  usuario() {
    this.userService.getUserDataFromToken().subscribe( (res: Session) => {
      return res.content.user;
    })
  }

  userData = this.fb.group({
    rut: [this.rut],
    nombres: [this.userService._usuario.nombres],
    apellidos: [this.userService._usuario.apellidos],
    mail: [this.userService._usuario.mail],
    direccion: [this.direccion],
    fecha_nacimiento: [this.userService._usuario.fecha_nacimiento],
    
  });


  ubicacion: String = ''
  mapskey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDa4NeSZREAb_IGxYJ6Z_5FDuCM2VWHyMQ&q="

  setUbicacion(ubicacion: String) {
    if(ubicacion === 'undefined' || ubicacion === null || ubicacion === '') {
      this.userService.getPosition().then(pos => {
          this.ubicacion = `${this.latitude},${this.longitude}`;
        })
      }
      this.ubicacion = ubicacion;
  }

  getUbicacion() {
    return this.ubicacion;
  }

  get profilePicture() {
    return !!this.userService._usuario.foto ? "http://localhost:3000/" + this.userService._usuario.foto : '../../../assets/img/defaultprofilepic.png';
  }

  ngOnInit(): void {
    this.userService.getUserDataFromToken().subscribe( (res: Session) => {
      const { rut, dv, nombres, apellidos, mail, direccion, fecha_nacimiento, ultima_visita, fecha_registro } = res.content.user;
      this.userData.setValue({
        rut: rut + '-' + dv,
        nombres: nombres,
        apellidos: apellidos,
        mail: mail,
        direccion: direccion,
        fecha_nacimiento: fecha_nacimiento,
      })
    })
      
    this.setUbicacion(this.userData.value.direccion!);
  }

  picture: any = new Event('');

  handlePicture(event: Event) {
    this.picture = event;
    this.handleProfile();
    this.getLocation();
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
    this.setUbicacion(this.userData.value.direccion!);
    this.userData.setValue({
      rut: this.rut,
      nombres: this.nombres,
      apellidos: this.apellidos,
      mail: this.mail,
      direccion: this.direccion,
      fecha_nacimiento: this.fecha_nacimiento
    });
    
    this.getLocation();
  }

  latitude: string = "";
  longitude: string = "";

  getLocation() {
    this.userService.getPosition().then(pos => {
      if(this.userService._usuario.direccion === null){
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        this.ubicacion = `${this.latitude},${this.longitude}`;
      }
    });
  }

  editUser() {
    
    this.userService.updateUser(this.userData).subscribe((resp: any) => {
      if(resp.ok) {
        this.userService.regenerateSession().subscribe();
      }
    });
  }


}
