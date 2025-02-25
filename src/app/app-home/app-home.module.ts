import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardInformationClientComponent } from './components/clients/components/card-information-client/card-information-client.component';
import { ClientsSelectedComponent } from './components/clients/components/clients-selected/clients-selected.component';
import { ClientsManagementComponent } from './components/clients/components/clients-management/clients-management.component';
import localePt from '@angular/common/locales/pt';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ModalDialogComponent } from '../shared/components/modal-dialog/modal-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { WelcomeComponent } from './components/welcome/welcome.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    ClientsComponent,
    HomeComponent,
    ProductsComponent,
    CardInformationClientComponent,
    ClientsSelectedComponent,
    ClientsManagementComponent,
    ModalDialogComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AppHomeRoutingModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    TooltipModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ToastModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class AppHomeModule {}
