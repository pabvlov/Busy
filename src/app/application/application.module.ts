import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { OfferComponent } from './offer/offer.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ApplicationComponent,
    OfferComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ApplicationModule { }
