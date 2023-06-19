import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RutService } from 'rut-chileno';
import { SwalService } from 'src/app/services/swal.service';
import { Session } from 'src/app/interfaces/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /* variables */
  info: string = '';
  step = 0;
  passInfo: string = '';
  fullname: string = '';

  /* constructor and init methods */
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private rutService: RutService, private swal: SwalService) {
    if (this.userService.isAuthenticated()) {
      window.location.href = '/';
    }
  }

  /* forms */
  personForm = this.fb.group({
    rut: ['', [Validators.required, this.rutService.validaRutForm]],
  });

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    recuerdame: [true]
  });

  /* getters */

  next() {
    this.swal.loading();

    if (!this.rutService.validaRUT(this.personForm.value.rut!)) {
      let rut: string = <string>this.rutService.getRutChile(3, this.personForm.value.rut!)!; // saca el rut en format 11111111-1
      this.userService.getUserByRut(rut).subscribe((data: Session) => {
        if (data.content.user != null) {
          this.swal.close();
          this.info = 'Usuario encontrado';
          this.fullname = `${data.content.user.usuario.nombres} ${data.content.user.usuario.apellidos}`;
          this.step++;
        } else {

          this.info = 'Usuario no encontrado';
        }
      });
    } else {
      this.info = 'El rut que ingresaste no cumple con el formato correcto';
    }

  }

  login() {
    this.swal.loading();
    this.userService.getSession(<string>this.rutService.getRutChile(3, this.personForm.value.rut!)!, this.passwordForm.value.password!)
      .subscribe(resp => {
        if (resp) {
          console.log(resp);
          if(this.passwordForm.value.recuerdame) {
            this.userService.setSession(resp.content.user, this.passwordForm.value.password!);
          } else {
            this.userService.setSession(resp.content.user);
          }
          this.router.navigate(['/app'], { skipLocationChange: false })
          this.swal.close();
        } else {
          this.swal.close();
          this.swal.authFail("Contraseña incorrecta");
          this.passInfo = 'Contraseña incorrecta';
        }
      })
  }
}
