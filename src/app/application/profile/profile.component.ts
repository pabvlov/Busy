import { Component, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ApiResponse } from '../../interfaces/api-response';
import { Session } from 'src/app/interfaces/session';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SwalService } from 'src/app/services/swal.service';
import { Profile } from 'src/app/interfaces/profile';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() visitor = false;
  @Input() userRut: number = 0;

  loading = true;
  constructor( private userService: UserService, private fb: FormBuilder, private swal: SwalService, private route: ActivatedRoute) {
    if (!this.userService.isAuthenticated()) {
      window.location.href = '/';
    }
  }

  get rut() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      if(!!this.profileInfo) {
        return this.profileInfo.user[0].rut! + '-' + this.profileInfo.user[0].dv;
      }
        return 'Cargando...'
    }
    return this.userService._usuario.rut + '-' + this.userService._usuario.dv;
  }

  ngOnChanges(): void {
    this.loading = true;
    
    if (this.route.snapshot.paramMap.get('id') != null || this.userRut != 0) {
      this.visitor = true;
      this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? ''+this.userRut: this.route.snapshot.paramMap.get('id')!) : this.rut).subscribe( (resp: ApiResponse) => {
        if(resp.ok) {
          console.log(resp.content);
          this.loading = false;
          this.profileInfo = resp.content;
        }
      })
    } else {
      this.visitor = false;
    }
    
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
    if (this.route.snapshot.paramMap.get('id') != null) {
      return this.profileInfo.user[0].mail;
    } else return this.userService._usuario.mail;
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
  }

  getProfileInfo(rut: string) {
    this.route.snapshot.paramMap.get('id') != null ? this.visitor = true : this.visitor = false;
    if (this.route.snapshot.paramMap.get('id') != null || this.userRut != 0) {
      this.visitor = true;
    } else {
      this.visitor = false;
    }
    console.log(this.route.snapshot.paramMap.get('id'), this.userRut, this.visitor, rut);
    
    this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? ''+this.userRut: this.route.snapshot.paramMap.get('id')!) : rut).subscribe( (resp: ApiResponse) => {
      if(resp.ok) {
        console.log(resp.content);
        this.loading = false;
        this.profileInfo = resp.content;
      }
    })
    console.log(this.visitor);
    
    
  }

  userData = this.fb.group({
    rut: [this.rut],
    nombres: [this.userService._usuario.nombres],
    apellidos: [this.userService._usuario.apellidos],
    mail: [this.userService._usuario.mail],
    direccion: [this.direccion],
    fecha_nacimiento: [this.userService._usuario.fecha_nacimiento],
    
  });


  get profilePicture() {
    return !!this.profileInfo.user[0].foto ? "http://localhost:3000/" + this.profileInfo.user[0].foto : '../../../assets/img/defaultprofilepic.png';
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
    this.userData.setValue({
      rut: this.rut,
      nombres: this.nombres,
      apellidos: this.apellidos,
      mail: this.mail,
      direccion: this.direccion,
      fecha_nacimiento: this.fecha_nacimiento
    });
    this.userService.regenerateSession().subscribe( (resp: any) => {
      if(resp.ok) {
        this.getProfileInfo(resp.content.user.rut.toString());
      }
    });
    
    
  }

  profileInfo: Profile = {
    user: [{
      rut: 0,
      dv: 0,
      nombres: '',
      apellidos: '',
      mail: '',
      direccion: null,
      fecha_nacimiento: null,
      ultima_visita: new Date(),
      fecha_registro: new Date(),
      foto: ''
    }],
    workInformation: [],
  };

  

  latitude: string = "";
  longitude: string = "";

  editUser() {
    
    this.userService.updateUser(this.userData).subscribe((resp: any) => {
      if(resp.ok) {
        this.userService.regenerateSession().subscribe();
        this.swal.success('Usuario actualizado', 'Se han actualizado los datos del usuario');
      }
    });
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
