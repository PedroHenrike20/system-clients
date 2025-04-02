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
  clientsPreviousMonth: ClientDTO[] = [];
  clientsCurrentMonth: ClientDTO[] = [];
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
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7);
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).toISOString().slice(0, 7);

    this.clientsCurrentMonth = this.clientService.groupCustomersMonth(this.data, currentMonth);
    this.clientsPreviousMonth = this.clientService.groupCustomersMonth(this.data, previousMonth);

    this.currentCustomerQuantity = this.clientsCurrentMonth.length;
    this.previousCustomerQuantity = this.clientsPreviousMonth.length;

    this.calculateEvolutionRate();
    this.calculateEvolutionWin();
    this.calculateEvolutionBalance();
  }

  calculateEvolutionRate(): void {
    if(this.data.length === 0) {
      this.clientsEvolutionRate = 0;
      return;
    }
    if(this.previousCustomerQuantity === 0) {
      this.clientsEvolutionRate = 100;
    }else {
      this.clientsEvolutionRate = Math.abs(Math.abs(((this.currentCustomerQuantity - this.previousCustomerQuantity) / this.previousCustomerQuantity) * 100) - 100);
    }
  }

  calculateEvolutionWin(): void {
    if(this.data.length === 0) {
      this.winEvolutionRate = 0;
      return;
    }
    const totalGainPreviousMonth = this.clientsPreviousMonth.reduce((total, client) => {
      const companyValue = client.companyValuation || 0;
      return total + (companyValue * 0.2);
    }
    , 0);

    
    const totalGainCurrentMonth = this.clientsCurrentMonth.reduce((total, client) => {
      const companyValue = client.companyValuation || 0;
      return total + (companyValue * 0.2);
    }
    , 0);
    
    if(totalGainPreviousMonth === 0) {
      this.winEvolutionRate = 100;
      return;
    }

    this.winEvolutionRate = Math.abs(Math.abs(((totalGainCurrentMonth - totalGainPreviousMonth) / totalGainPreviousMonth) * 100) - 100);
  }

  calculateEvolutionBalance(): void {
    if(this.data.length === 0) {
      this.balanceEvolutionRate = 0;
      return;
    }
    const totalBalancePreviousMonth = this.clientsPreviousMonth.reduce((total, client) => {
      return total + (client.companyValuation || 0);
    }, 0);

    const totalBalanceCurrentMonth = this.clientsCurrentMonth.reduce((total, client) => {
      return total + (client.companyValuation || 0);
    }, 0);

    if(totalBalancePreviousMonth === 0) {
      this.balanceEvolutionRate = 100;
      return;
    }

    this.balanceEvolutionRate = Math.abs(Math.abs(((totalBalanceCurrentMonth - totalBalancePreviousMonth) / totalBalancePreviousMonth) * 100) - 100);
  }
}
