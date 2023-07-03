import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { OfferComponent } from './offer/offer.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { TrabajoComponent } from './profile/trabajo/trabajo.component';
import { OfferServiceComponent } from './offer-service/offer-service.component';
import { EvidenceComponent } from './evidence/evidence.component';

const routes: Routes = [
  { path: '', component: ApplicationComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'offer-service', component: OfferServiceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile/trabajo/:id', component: TrabajoComponent },
  { path: 'profile/trabajo/:id/evidence', component: EvidenceComponent },
  { path: '**', redirectTo: '' } // Ruta por defecto si no se encuentra ninguna coincidencia
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
