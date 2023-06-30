import { Component, Input, OnInit, AfterViewInit, OnChanges, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiResponse } from '../../interfaces/api-response';
import { Session } from 'src/app/interfaces/session';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SwalService } from 'src/app/services/swal.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Postulaciones, Postulante, UserInformation } from 'src/app/interfaces/user-information';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() visitor = false;
  @Input() userRut: number = 0;

  loading = true;
  constructor( private userService: UserService, @Inject(FormBuilder) private fb: FormBuilder, private swal: SwalService, @Inject(ActivatedRoute) private route: ActivatedRoute,
                private location: Location) {
    if (!this.userService.isAuthenticated() && this.route.snapshot.paramMap.get('id') == null) {
      window.location.href = '/';
    } 
    else if (this.route.snapshot.paramMap.get('id') != null) {
      this.visitor = true;
    }
      
  }

  get rut() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      if(!!this.profileInfo) {
        return this.profileInfo.user.rut! + '-' + this.profileInfo.user.dv;
      }
        return 'Cargando...'
    }
    return this.userService._usuario.user.rut + '-' + this.userService._usuario.user.dv;
  }

  goBackToPreviousPage() {
    this.location.back();
  }

  ngOnChanges(): void {
    this.loading = true;
    
    if (this.route.snapshot.paramMap.get('id') != null || this.userRut != 0) {
      this.visitor = true;
    } else {
      this.visitor = false;
    }
    this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? ''+this.userRut: this.route.snapshot.paramMap.get('id')!) : this.rut).subscribe( (resp: ApiResponse) => {
      if(resp.ok) {
        console.log(resp);
        this.loading = false;
        this.profileInfo = resp.content;
      }
    })
  }

  get nombre() {
    return this.userService._usuario.user.nombres + ' ' + this.userService._usuario.user.apellidos;
  }

  get nombres() {
    return this.userService._usuario.user.nombres;
  }

  get apellidos() {
    return this.userService._usuario.user.apellidos;
  }

  get mail() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      return this.profileInfo.user.mail;
    } else return this.userService._usuario.user.mail;
  }

  get direccion() {
    const { direccion } = this.userService._usuario.user;
    if(direccion === 'undefined' || direccion === null || direccion === '') {
      this.userService.getPosition().then(pos => {
          return pos.lat + ',' + pos.lng;
        })
      }
      return direccion;
  }
    

  get fecha_nacimiento() {
    return this.userService._usuario.user.fecha_nacimiento;
  }

  get ultima_visita() {
    return this.userService._usuario.user.ultima_visita;
  }

  get fecha_registro() {
    return this.userService._usuario.user.fecha_registro;
  }

  haveUserAcceptedPostulation(applier: Postulaciones) {
    // check if the applier has been accepted
    return applier.id_estado === 1;
  }

  usuario() {
  }

  get apiUrl() {
    return environment.apiUrl;
  }

  getProfileInfo(rut: string) {
    this.route.snapshot.paramMap.get('id') != null ? this.visitor = true : this.visitor = false;
    this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? ''+this.userRut: this.route.snapshot.paramMap.get('id')!) : rut).subscribe( (resp: ApiResponse) => {
      console.log(resp);
      
      if(resp.ok) {
        console.log(resp);
        this.loading = false;
        this.profileInfo = resp.content.user;
      }
    })
    console.log(this.visitor);
    
    
  }

  userData = this.fb.group({
    rut: [this.rut],
    nombres: [this.userService._usuario.user.nombres],
    apellidos: [this.userService._usuario.user.apellidos],
    mail: [this.userService._usuario.user.mail],
    direccion: [this.direccion],
    fecha_nacimiento: [this.userService._usuario.user.fecha_nacimiento],
    
  });


  get profilePicture() {
    return !!this.profileInfo.user.foto ? "http://localhost:3000/" + this.profileInfo.user.foto : '../../../assets/img/defaultprofilepic.png';
  }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id') != null ? this.visitor = true : this.visitor = false;
    if (!this.visitor) {
      this.userService.getUserDataFromToken().subscribe( (res: Session) => {
        console.log(res);
        
        const { rut, dv, nombres, apellidos, mail, direccion, fecha_nacimiento, ultima_visita, fecha_registro } = res.content.user.user;
        this.userData.setValue({
          rut: rut + '-' + dv,
          nombres: nombres,
          apellidos: apellidos,
          mail: mail,
          direccion: direccion,
          fecha_nacimiento: fecha_nacimiento,
        })
      })
    } else {
      this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? ''+this.userRut: this.route.snapshot.paramMap.get('id')!) : this.rut).subscribe( (resp: ApiResponse) => {
        if(resp.ok) {
          console.log(resp);
          this.loading = false;
          this.profileInfo = resp.content.user;
        }
      })
    }
  }

  picture: any = new Event('');

  handlePicture(event: Event) {
    this.picture = event;
    this.handleProfile();
  }

  handleProfile(){
    const formData = new FormData();
    formData.append('rut', this.userService._usuario.user.rut.toString());
    if (this.picture.target.files![0] == '') {
      console.log('No se selecciono ningun archivo');
    } else {
      this.userService.uploadProfilePicture(this.userService._usuario.user.rut.toString(), this.picture.target.files[0]).subscribe( (resp: any) => {
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
    this.userService.regenerateSession().subscribe( (resp: Session) => {
      if(resp.ok) {
        this.getProfileInfo(resp.content.user.user.rut.toString());
      }
    });
    
    
  }

  profileInfo: UserInformation = this.userService._usuario;

  

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
