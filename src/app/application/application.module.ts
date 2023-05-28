import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { OfferComponent } from './offer/offer.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SafePipe } from '../pipes/safe.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { JobInfoComponent } from './job-info/job-info.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OfertasComponent } from './profile/ofertas/ofertas.component';
import { TrabajosComponent } from './trabajos/trabajos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TrabajoComponent } from './profile/trabajo/trabajo.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    NavbarComponent,
    OfferComponent,
    ProfileComponent,
    SafePipe,
    JobInfoComponent,
    AboutComponent,
    OfertasComponent,
    TrabajosComponent,
    ServiciosComponent,
    TrabajoComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ApplicationRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
    FormsModule
  ]
})
export class ApplicationModule { }
