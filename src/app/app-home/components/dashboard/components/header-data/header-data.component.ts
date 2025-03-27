import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClientDTO } from 'src/app/app-home/models/client.model';
import { ClientService } from 'src/app/app-home/services/client-service/client.service';

@Component({
  selector: 'app-header-data',
  templateUrl: './header-data.component.html',
  styleUrls: ['./header-data.component.scss']
})
export class HeaderDataComponent implements OnChanges {
  @Input() data: ClientDTO[] = [];

  currentCustomerQuantity: number = 0;
  previousCustomerQuantity: number = 0;
  clientsEvolutionRate: number = 0;
  winEvolutionRate: number = 0;
  balanceEvolutionRate: number = 0;

ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.loadCustomersPerMonth();
    }
}

  constructor(private clientService: ClientService) { }

  get totalClients(): number {
    return this.data.length;
  }

  get totalGain(): number {
    return this.data.reduce((total, client) => {
      const companyValue = client.companyValuation || 0;
      return total + (companyValue * 0.2);
    }, 0);
  }

  get totalCompanyValue(): number { 
    return this.data.reduce((total, client) => {
      return total + (client.companyValuation || 0);
    }, 0);
  }

  loadCustomersPerMonth(): void {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);

    this.currentCustomerQuantity = this.clientService.calculateCustomersPerMonth(this.data, currentMonth);
    this.previousCustomerQuantity = this.clientService.calculateCustomersPerMonth(this.data, previousMonth);

    this.calculateEvolutionRate();
    
  }

  calculateEvolutionRate(): void {
    if(this.previousCustomerQuantity === 0) {
      this.clientsEvolutionRate = 100;
    }else {
      this.clientsEvolutionRate = ((this.currentCustomerQuantity - this.previousCustomerQuantity) / this.previousCustomerQuantity) * 100;
    }
  }
}
