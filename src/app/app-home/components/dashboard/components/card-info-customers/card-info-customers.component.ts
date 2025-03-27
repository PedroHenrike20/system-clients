import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClientDTO } from 'src/app/app-home/models/client.model';

@Component({
  selector: 'app-card-info-customers',
  templateUrl: './card-info-customers.component.html',
  styleUrls: ['./card-info-customers.component.scss'],
})
export class CardInfoCustomersComponent implements OnChanges {
  @Input() data: ClientDTO[] = [];
  topClients: ClientDTO[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.getTopClients();
    }
  }


  getTopClients() {
    this.topClients = this.data
      .sort((a, b) => b.companyValuation - a.companyValuation)
      .slice(0, 3);
  }

}
