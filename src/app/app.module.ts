import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { BtnGotoComponent } from './shared/btn-goto/btn-goto.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RegisterComponent } from './shared/register/register.component';

@NgModule({
  declarations: [
    LandingComponent,
    BtnGotoComponent,
    SidebarComponent,
    RegisterComponent,
    AppComponent // must be last
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
