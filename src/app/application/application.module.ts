import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { OfferComponent } from './offer/offer.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SafePipe } from '../pipes/safe.pipe';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { JobInfoComponent } from './job-info/job-info.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    OfferComponent,
    ProfileComponent,
    SafePipe,
    JobInfoComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ApplicationRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
  ]
})
export class ApplicationModule { }
