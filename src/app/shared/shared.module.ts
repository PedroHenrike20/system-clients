import { LOCALE_ID, NgModule, } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ModalDialogComponent],
  imports: [
    CommonModule,
  ],
  providers: [
  ],
})
export class SharedModule {}
