import { Component } from '@angular/core';
import { ServiceInformation } from 'src/app/interfaces/service-information';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-service',
  templateUrl: './offer-service.component.html',
  styleUrls: ['./offer-service.component.scss']
})
export class OfferServiceComponent {
  constructor(private serviceService: ServiceService,
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router) { }

  part = 1;

  offerForm = this.fb.group({
    title: [''],
    description: [''],
    price: [''],
  });

  get usuario() {
    return this.userService._usuario;
  }

  event: any = new Event('');

  handleEvent(event: Event) {
    this.event = event;
  }

  ngOnInit(): void {

  }

  uploadService() {
    let rut = 11111111
    this.userService.getUpdatedUserData().subscribe(resp => {
      const { user, token } = resp.content // destructuring de la response
      console.log(user);
      
      localStorage.setItem('token', token!) // guardamos el jwt en localstorage

      let service: ServiceInformation = {
        titulo: this.offerForm.value.title!,
        descripcion: this.offerForm.value.description!,
        precio: +this.offerForm.value.price!,
        rut_usuario: user.usuario.rut!,

      }

      const formData = new FormData();
      formData.append('file', this.event.target.files[0]);
      formData.append('service', JSON.stringify(service));


      const file: File = this.event.target.files[0];
      if (file) {
        this.serviceService.uploadService(formData).subscribe(resp => {
          console.log(resp);
          this.route.navigate(['/app/profile']);
        });
      }

    }
    )
  }

  next() {
    this.part++;
  }
}
