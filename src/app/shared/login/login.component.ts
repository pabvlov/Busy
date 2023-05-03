import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  /* forms */
  personForm = this.fb.group({
    rut: ['', Validators.required],
  });

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    recuerdame: [true]
  });

  /* getters */

  next() {
    this.info = 'cargando...';
    this.userService.getUserByRut(this.personForm.value.rut!).subscribe((data: any) => {
      if (data.length > 0) {
        this.info = 'Usuario encontrado';
        this.fullname = `${data[0].nombres} ${data[0].apellidos}`;
        this.step++;
      } else {
        this.info = 'Usuario no encontrado';
      }
    });
  }

  login() {
    this.userService.getSession(this.personForm.value.rut!, this.passwordForm.value.password!)
            .subscribe(resp => {
              if( resp ) {
                this.router.navigateByUrl('/app', {skipLocationChange: true});
                window.location.reload();
              }
            })
  }
}
