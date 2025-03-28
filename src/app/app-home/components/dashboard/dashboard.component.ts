import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client-service/client.service';
import { MessageService } from 'primeng/api';
import { ClientDTO } from '../../models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements  OnInit {

  dataClients: ClientDTO[] = [];
  isLoading: boolean = false;

  constructor(private clientService: ClientService, private messageService: MessageService) {
  }

  ngOnInit(): void {
      this.getAllDataClients();
  }

  getAllDataClients() {
    this.isLoading = true;
    this.clientService.getAllClients().subscribe({next: (response) => {
      this.dataClients = response;
      this.isLoading = false;
    },
    error: (err) => {
      this.isLoading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: err.message || 'Erro ao carregar os clientes',
      });
    },})
  }
}
