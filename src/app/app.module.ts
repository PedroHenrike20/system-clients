import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';


import { AppLoginComponent } from './pages/app-login/app-login.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { HomeComponent } from './pages/app-home/components/home/home.component';
import { ProductsComponent } from './pages/app-home/components/products/products.component';
import { ClientsComponent } from './pages/app-home/components/clients/clients.component';
import { CardInformationClientComponent } from './pages/app-home/components/clients/components/card-information-client/card-information-client.component';
import { MessageService } from 'primeng/api';
import { ClientService } from './pages/app-home/components/clients/services/client-service/client.service';
import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ClientsSelectedComponent } from './pages/app-home/components/clients/components/clients-selected/clients-selected.component';
import { ClientsManagementComponent } from './pages/app-home/components/clients/components/clients-management/clients-management.component';
import { ModalDialogComponent } from './pages/app-home/components/clients/components/modal-dialog/modal-dialog.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    AppHomeComponent,
    HomeComponent,
    ProductsComponent,
    ClientsComponent,
    CardInformationClientComponent,
    ClientsSelectedComponent,
    ClientsManagementComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    DialogModule
  ],
  providers: [ClientService, MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
