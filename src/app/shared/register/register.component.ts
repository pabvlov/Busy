import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  registerForm = this.fb.group({
    rut: [''],
    nombres: [''],
    apellidos: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
    recuerdame: [true]
  });

  register() {
    console.log(this.registerForm.value);
  }
}
