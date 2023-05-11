import { Component } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Work } from 'src/app/interfaces/work';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  constructor(private workService: WorkService, private fb: FormBuilder) { }

  offerForm = this.fb.group({
    title: [''],
    description: [''],
    price: [''],
    peopleNeeded: [1],
    endDate: [],
    selectionDate: [],
  });

  event: any = new Event('');

  handleEvent(event: Event) {
    this.event = event;
  }

  uploadWork() {
    let work: Work = {
      title: this.offerForm.value.title!,
      description: this.offerForm.value.description!,
      price: +this.offerForm.value.price!,
      peopleNeeded: this.offerForm.value.peopleNeeded!,
      endDate: this.offerForm.value.endDate!,
      selectionDate: this.offerForm.value.selectionDate!,
    }
    
    const formData = new FormData();
    formData.append('file', this.event.target.files[0]);
    formData.append('work', JSON.stringify(work));

    
    const file: File = this.event.target.files[0];
    if (file) {
      this.workService.uploadWork(formData).subscribe(resp => {
        console.log(resp);
      });
    }
  }

}
