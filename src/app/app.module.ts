import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { BtnGotoComponent } from './shared/btn-goto/btn-goto.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RegisterComponent } from './shared/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './shared/login/login.component';
import { ApplicationModule } from './application/application.module';
import { ApplicationComponent } from './application/application.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { AntiAuthGuard } from './guard/anti-auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    LandingComponent,
    BtnGotoComponent,
    SidebarComponent,
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
    ApplicationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  ],
  providers: [AuthGuardGuard, AntiAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
