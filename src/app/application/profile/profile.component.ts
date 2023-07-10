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
import { Postulacion, Postulante, UserInformation } from 'src/app/interfaces/user-information';
import { Postulaciones } from 'src/app/interfaces/postulaciones';
import { Applier } from 'src/app/interfaces/applier';
import { WorkService } from 'src/app/services/work.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() visitor = false;
  @Input() userRut: number = 0;
  
  navigation: number = 0;

  loading = true;
  constructor(private userService: UserService, 
    @Inject(FormBuilder) private fb: FormBuilder, 
    private swal: SwalService, @Inject(ActivatedRoute) 
    private route: ActivatedRoute,
    private location: Location,
    private workService: WorkService) {
    if (!this.userService.isAuthenticated() && this.route.snapshot.paramMap.get('id') == null) {
      window.location.href = '/';
    }
    else if (this.route.snapshot.paramMap.get('id') != null) {
      this.visitor = true;
    }

  }

  navigate(to: number) {
    console.log(to);
    
    this.navigation = to;
  }

  get rut() {
    if (this.route.snapshot.paramMap.get('id') != null) {
      if (this.profileInfo != null) {
        return this.profileInfo.user!.rut! + '-' + this.profileInfo.user!.dv;
      }
      return 'Cargando...'
    } else if (this.userService._usuario.user == null) {
      return ''
    } else return this.userService._usuario.user!.rut + '-' + this.userService._usuario.user!.dv;
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
    this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? '' + this.userRut : this.route.snapshot.paramMap.get('id')!) : this.rut).subscribe((resp: ApiResponse) => {
      if (resp.ok) {
        console.log(resp);
        this.loading = false;
        this.profileInfo = resp.content;
        console.log(this.profileInfo);
        
      }
    })
  }

  get nombre() {
    if (this.userService._usuario.user == null) {
      return ''
    } else
    return this.userService._usuario.user.nombres + ' ' + this.userService._usuario.user.apellidos;
  }

  get nombres() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.userService._usuario.user.nombres;
  }

  get apellidos() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.userService._usuario.user.apellidos;
  }

  get mail() {
    if (this.userService._usuario.user == null || this.profileInfo == null) {
      return ''
    } else if (this.route.snapshot.paramMap.get('id') != null) {
      return this.profileInfo.user!.mail;
    } else return this.userService._usuario.user.mail;
  }

  get direccion() {
    if (this.userService._usuario.user == null) {
      return ''
    }
    const { direccion } = this.userService._usuario.user;
    if (direccion === 'undefined' || direccion === null || direccion === '') {
      this.userService.getPosition().then(pos => {
        return pos.lat + ',' + pos.lng;
      })
    }
    return direccion;
  }


  get fecha_nacimiento() {
    if (this.userService._usuario.user == null) {
      return new Date()
    } else return this.userService._usuario.user.fecha_nacimiento;
  }

  get ultima_visita() {
    if (this.userService._usuario.user == null) {
      return new Date()
    } else
    return this.userService._usuario.user.ultima_visita;
  }

  get fecha_registro() {
    if (this.userService._usuario.user == null) {
      return new Date()
    } else
    return this.userService._usuario.user.fecha_registro;
  }

  haveUserAcceptedPostulation(applier: Postulacion) {
    // check if the applier has been accepted
    return applier.id_estado === 1;
  }

  get apiUrl() {
    return environment.apiUrl;
  }

  getProfileInfo(rut: string) {
    this.route.snapshot.paramMap.get('id') != null ? this.visitor = true : this.visitor = false;
    this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? '' + this.userRut : this.route.snapshot.paramMap.get('id')!) : rut).subscribe((resp: ApiResponse) => {
      console.log(resp);

      if (resp.ok) {
        console.log(resp);
        this.loading = false;
        this.profileInfo = resp.content.user;
      }
    })
    console.log(this.visitor);


  }

  userData = this.fb.group({
    rut: [this.rut],
    nombres: [this.nombres],
    apellidos: [this.apellidos],
    mail: [this.mail],
    direccion: [this.direccion],
    fecha_nacimiento: [this.fecha_nacimiento],

  });


  get profilePicture() {
    if (this.profileInfo == null) {
      return '../../../assets/img/defaultprofilepic.png';
    }
    else return !!this.profileInfo.user!.foto ? "http://localhost:3000/" + this.profileInfo.user!.foto : '../../../assets/img/defaultprofilepic.png';
  }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id') != null ? this.visitor = true : this.visitor = false;
    if (!this.visitor) {
      this.userService.getUserDataFromToken().subscribe((res: Session) => {
        console.log(res);

        const { rut, dv, nombres, apellidos, mail, direccion, fecha_nacimiento, ultima_visita, fecha_registro } = res.content.user.user!;
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
      this.userService.getProfileByRut(this.visitor ? (this.route.snapshot.paramMap.get('id') == null ? '' + this.userRut : this.route.snapshot.paramMap.get('id')!) : this.rut).subscribe((resp: ApiResponse) => {
        if (resp.ok) {
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

  handleProfile() {
    const formData = new FormData();
    formData.append('rut', this.userService._usuario.user!.rut.toString());
    if (this.picture.target.files![0] == '') {
      console.log('No se selecciono ningun archivo');
    } else {
      this.userService.uploadProfilePicture(this.userService._usuario.user!.rut.toString(), this.picture.target.files[0]).subscribe((resp: any) => {
        this.userService.regenerateSession().subscribe();
      });
    }
  }

  get profileUserRut() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.profileInfo.user!.rut;
  }

  get profileUserDv() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.profileInfo.user!.dv;
  }

  get profileUserNombres() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.profileInfo.user!.nombres;
  }

  get profileUserApellidos() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.profileInfo.user!.apellidos;
  }

  get profileUserMail() {
    if (this.userService._usuario.user == null) {
      return ''
    } else return this.profileInfo.user!.mail;
  }

  get profileInfoPostulaciones(): Postulacion[] {
    if (this.userService._usuario == null || this.profileInfo.user == null) {
      return []
    } else {
      console.log(this.profileInfo.postulaciones);
      return this.profileInfo.postulaciones!;
      
    }
  }

  get profileInfoPostulacionesCalificaciones(): number {
    let stars = 0;
    let trabajos = 0;
    if (this.userService._usuario == null || this.profileInfo.user == null) {
      return 0
    } else {
      if(this.profileInfo.postulaciones == null) return 0;
      else if(this.profileInfo.postulaciones.length == 0) return 0;
      else {
        for (let i = 0; i < this.profileInfo.postulaciones!.length; i++) {
          if (this.profileInfo.postulaciones![i].trabajo!.trabajo_realizado_propio == null) {
          } else if(this.profileInfo.postulaciones![i].trabajo.trabajo_realizado_propio?.calificacion_empleador == null) {
            stars += 5;
            trabajos++;
          }
          else {
            stars += this.profileInfo.postulaciones![i].trabajo!.trabajo_realizado_propio!.calificacion_empleador!;
            trabajos++;
          }
        }
      }
      if (trabajos == 0) {
        trabajos = 1;
      }  
      return stars / trabajos;
      
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
    this.userService.regenerateSession().subscribe((resp: Session) => {
      if (resp.ok) {
        this.getProfileInfo(resp.content.user.user!.rut.toString());
      }
    });


  }

  profileInfo: UserInformation = this.userService._usuario;



  latitude: string = "";
  longitude: string = "";

  editUser() {

    this.userService.updateUser(this.userData).subscribe((resp: any) => {
      if (resp.ok) {
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
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
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

  hasNullTrabajoRealizado(applier: Postulacion): boolean {
    return applier.trabajo.trabajo_realizado_propio === null;
  }

  
  cantidadEstrellas(applier: Postulacion): number[] {
    return [...Array(5).keys()].map( i => i + 1).slice(0, applier.trabajo.trabajo_realizado_propio?.calificacion_trabajador || 0);
  }


}
