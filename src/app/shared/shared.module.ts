import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
  
  
  ],
  imports: [
    CommonModule
  ],
  providers: [
    
  ]
})
export class SharedModule { }
