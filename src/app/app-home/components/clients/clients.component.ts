import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header-service/header.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  private buttonClickSubscription: Subscription | null = null;
  showListClients: boolean = true;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.buttonClickSubscription = this.headerService.buttonClicked$.subscribe(
      (buttonId) => {
        if (buttonId !== 'clients') {
          this.showListClients = false;
        } else {
          this.showListClients = true;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.buttonClickSubscription) {
      this.buttonClickSubscription.unsubscribe();
    }
  }
}
