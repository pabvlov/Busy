import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { RutService } from 'rut-chileno';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /* variables */
  info: string = '';
  step = 0;
  passInfo: string = '';

  /* constructor and init methods */
  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router, private rutService: RutService) { }

  ngOnInit(): void {

  }

  /* forms */
  personForm = this.fb.group({
    rut: ['', [Validators.required, this.rutService.validaRutForm]],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', Validators.required],
  });

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    recuerdame: [true]
  });

  /* getters */

  get fullname() {
    return `${this.personForm.get('nombres')?.value} ${this.personForm.get('apellidos')?.value}`;
  }

  /* methods */

  next() {
    if(!this.rutService.validaRUT(this.personForm.value.rut!)) {
      if (this.personForm.valid) {
        this.step++;
      } else {
        this.info = 'Debe completar todos los campos';
      }
      
    } else {
      this.info = 'El rut que ingresaste no cumple con el formato correcto';
    }
   ;
  }

  register() {
    if (this.personForm.valid && this.passwordForm.valid) {
      if (this.passwordForm.get('password')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        this.passInfo = 'Las contraseñas no coinciden';
      } else {
        const { rut, nombres, apellidos, email } = this.personForm.value;
        let rutFormatted = <string>this.rutService.getRutChile(3, rut!)!;
        const { password } = this.passwordForm.value; 
        this.userService.registerUser( rutFormatted!, nombres!, apellidos!, email!, password! ).subscribe((data: any) => {
          if(data.ok == false) {
            this.passInfo = data.message;
          } 
          if(data.ok == true) {
            this.passInfo = 'Usuario registrado con éxito';
            delay(2000);
            this.userService.getSession(rutFormatted!, password!)
            .subscribe(resp => {
              if( resp ) {
                this.router.navigate(['/app/profile']);
              }
            })
          }
        }, (error: any) => {
          console.log(error.error);
          this.passInfo = error.error.message;
        }
        );
      }
      
      
    } else {
      this.info = 'Debe completar todos los campos';
      this.step = 0;
    }
  }
}
