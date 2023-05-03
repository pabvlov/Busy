import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


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
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.personForm.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  /* forms */
  personForm = this.fb.group({
    rut: ['', Validators.required],
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
    this.step++;
  }

  register() {
    if (this.personForm.valid && this.passwordForm.valid) {
      if (this.passwordForm.get('password')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        this.passInfo = 'Las contraseñas no coinciden';
      } else {
        const { rut, nombres, apellidos, email } = this.personForm.value;
        const { password } = this.passwordForm.value; 
        this.userService.registerUser( rut!, nombres!, apellidos!, email!, password! ).subscribe((data: any) => {
          if(data.ok == false) {
            this.passInfo = data.message;
          } 
          if(data.ok == true) {
            this.passInfo = 'Usuario registrado con éxito';
            delay(2000);
            this.userService.getSession(rut!, password!)
            .subscribe(resp => {
              if( resp ) {
                console.log(resp);
                
                /* this.router.navigateByUrl('/app', {skipLocationChange: true}); */
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
