import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.scss']
})
export class EvidenceComponent {

  event: any = new Event('');
  public imagePreview!: string;

  public previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  handleEvent(event: Event) {
    this.event = event;
    const file: File = (event.target as HTMLInputElement).files![0];
    this.previewImage(file);
  }
  
  id: number = +this.route.snapshot.paramMap.get('id')!;

  constructor(private workService: WorkService, 
              private route: ActivatedRoute, 
              @Inject(FormBuilder) private fb: FormBuilder,
              private userService: UserService,
              private swal: SwalService) { }

  ngOnInit(): void {
    this.workService.updateProfileWork(this.id);
  }

  get work() {
    return this.workService.work;
  }

  evidence = this.fb.group({
    comentario: ['']
  });

  handleSubmit() {     
    if (this.rating == 0) {
      this.swal.error('Debes calificar el trabajo', 'Selecciona una de las estrellas');
    } else if (this.event.target == null) {
      this.swal.error('Debes subir un archivo', 'Selecciona un archivo');
    } else {
      const workEvidence = {
        id_trabajo: this.work.id,
        rut_trabajador: this.userService._usuario.user!.rut,
        comentario: this.evidence.value.comentario,
        calificacion: this.rating,
      }
      // make work evidence a formdata
      const formData = new FormData();
      formData.append('file', this.event.target.files[0]);
      formData.append('workEvidence', JSON.stringify(workEvidence));
      
      this.workService.uploadWorkEvidence(formData)
    }
    
  }
  
  stars = [1, 2, 3, 4, 5];
  rating = 0;

  rate(value: number) {
    this.rating = value;
  }

}
