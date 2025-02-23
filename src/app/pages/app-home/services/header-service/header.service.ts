import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private buttonClickSubject = new BehaviorSubject<'clients' | 'client_selected'>('clients');

  buttonClicked$ = this.buttonClickSubject.asObservable();

  triggerButtonClick(buttonId: 'clients' | 'client_selected') {
    this.buttonClickSubject.next(buttonId)
  }

  resetState() {
    this.buttonClickSubject.next('clients');
  }


  constructor() { }
}
