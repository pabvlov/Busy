import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { ApplicationComponent } from './application/application.component';
import { AntiAuthGuard } from './guard/anti-auth.guard';
import { OfferComponent } from './application/offer/offer.component';

const routes: Routes = [
  { path: '',  component: LandingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'app', component: ApplicationComponent },
  { path: 'app/offer', component: OfferComponent },
  { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
