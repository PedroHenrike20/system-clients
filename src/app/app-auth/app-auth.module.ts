import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAuthRoutingModule } from './app-auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AppAuthRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ]
})
export class AppAuthModule { }
