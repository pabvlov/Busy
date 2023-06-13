import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Work } from 'src/app/interfaces/work';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import { MapsService } from 'src/app/services/maps.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(private workService: WorkService, 
              private fb: FormBuilder, 
              private userService: UserService,
              private maps: MapsService,
              private route: Router,
              private swal: SwalService) { }

  part = 1;

  offerForm = this.fb.group({
    title: [''],
    description: [''],
    price: [''],
    peopleNeeded: [1],
    endDate: [],
    selectionDate: [],
    ubicacion: []
  });

  get usuario() {
    return this.userService._usuario.usuario;
  }

  get mapskey() {
    return this.maps.mapskey;
  }

  event: any = new Event('');

  handleEvent(event: Event) {
    this.event = event;
  }

  ubicacion: string = '';

  ngOnInit(): void {
    this.userService.getPosition().then(pos => {
      this.ubicacion = pos.lat + ',' + pos.lng;
    })

    this.offerForm.valueChanges.subscribe(resp => {
      this.ubicacion = resp.ubicacion!

    })

  }

  uploadWork() {
    let rut = 11111111
    this.userService.getUpdatedUserData().subscribe(resp => {
      const { user, token } = resp.content // destructuring de la response
      localStorage.setItem('token', token!) // guardamos el jwt en localstorage

      let work: Work = {
        title: this.offerForm.value.title!,
        description: this.offerForm.value.description!,
        price: +this.offerForm.value.price!,
        peopleNeeded: this.offerForm.value.peopleNeeded!,
        endDate: this.offerForm.value.endDate!,
        selectionDate: this.offerForm.value.selectionDate!,
        rut_empleador: user.usuario.rut!,
        ubicacion: this.ubicacion
      }
  
      const formData = new FormData();
      formData.append('file', this.event.target.files[0]);
      formData.append('work', JSON.stringify(work));
  
  
      const file: File = this.event.target.files[0];
      if (file) {
        this.swal.loading('Subiendo trabajo...');
        this.workService.uploadWork(formData).subscribe(resp => {
          this.route.navigate(['/app/profile']);
          this.swal.stopLoading();
        });
      }

    }
    )
  }

  next() {
    this.part++;
  }

  

}
