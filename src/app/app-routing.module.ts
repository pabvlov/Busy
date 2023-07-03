import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  { path: '', component: ApplicationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule)
  },
  { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
