import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BtnGotoComponent } from './shared/btn-goto/btn-goto.component';
import { RegisterComponent } from './shared/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { AntiAuthGuard } from './guard/anti-auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RutModule } from 'rut-chileno';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationModule } from './application/application.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    LandingComponent,
    BtnGotoComponent,
    RegisterComponent,
    LoginComponent,
    AppComponent, // must be last
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RutModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatGridListModule,
    MatNativeDateModule,
    ApplicationModule
  ],
  providers: [AuthGuardGuard, AntiAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
