import { Component } from '@angular/core';
import { ClientDTO, ReqClientListDTO } from '../../models/client.model';
import { ClientService } from '../../services/client-service/client.service';
import { MessageService } from 'primeng/api';
import { SelectionService } from '../../services/selection-service/selection.service';

@Component({
  selector: 'app-clients-management',
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.scss'],
})
export class ClientsManagementComponent {
  clients: ClientDTO[] = [];
  totalPages: number = 0;
  totalRecords: number = 0;
  resetPaginator: number = 1;
  reqClients: ReqClientListDTO = {
    limit: 10,
    page: 1,
  };
  dialogVisible = false;
  dialogTitle = '';
  dialogContent = '';
  confirmButtonText = '';
  actionType!: 'delete' | 'edit' | 'create';
  clientSelected: ClientDTO | null = null;

  get numberRecords(): number {
    return this.clients.length;
  }

  constructor(
    private clientService: ClientService,
    private selectionService: SelectionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients(this.reqClients).subscribe({
      next: (response) => {
        this.clients = response.clients;
        this.totalPages = response.totalPages;
        this.reqClients.page = response.currentPage - 1;

        this.totalRecords = this.totalPages * this.reqClients.limit;

        console.log(this.reqClients);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message || 'Erro ao carregar os clientes',
        });
      },
    });
  }

  toggleSelectionClient(item: ClientDTO) {
    this.selectionService.toggleItemSelection(item);
  }

  openDialog(action: 'delete' | 'edit' | 'create', data: ClientDTO | null) {
    this.actionType = action;

    if (action === 'delete') {
      this.dialogTitle = 'Excluir cliente:';
      this.dialogContent = `Você está prestes a excluir o cliente: <b>${data?.name}</b>`;
      this.confirmButtonText = 'Excluir cliente';
      this.clientSelected = data;
    } else if (action === 'edit') {
      this.dialogTitle = 'Editar cliente:';
      this.dialogContent = ``;
      this.confirmButtonText = 'Editar cliente';
      this.clientSelected = data;
    } else if (action === 'create') {
      this.dialogTitle = 'Criar cliente:';
      this.dialogContent = ``;
      this.confirmButtonText = 'Criar cliente';
      this.clientSelected = data;
    }

    this.dialogVisible = true;
  }

  closeDialog(event: boolean) {
    this.dialogVisible = event;
  }

  confirmAction(newData: Partial<ClientDTO> | null) {
    if (this.clientSelected) {
      if (this.actionType === 'delete') {
        this.deleteClient();
      } else if (this.actionType === 'edit') {
        this.editClient(newData!);
      }
    } else {
      this.createClient(newData!);
    }
  }

  deleteClient() {
    this.clientService.deleteClient(this.clientSelected!.id!).subscribe({
      next: (message) => {
        console.log({ message });
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente excluído com sucesso!',
        });
        this.dialogVisible = false;
        this.getClients();
      },
      error: (err) => {
        console.log({ err });
        if (err.error.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente excluído com sucesso!',
          });
          this.dialogVisible = false;
          this.getClients();
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
      },
    });
  }

  editClient(clientUpdated: Partial<ClientDTO>) {
    this.clientService.updateClient(clientUpdated).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente atualizado com sucesso!',
        });
        this.dialogVisible = false;
        this.getClients();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
      },
    });
  }

  createClient(newClient: Partial<ClientDTO>) {
    this.clientService.createClient(newClient).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente cadastrado com sucesso!',
        });
        this.dialogVisible = false;
        this.getClients();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
      },
    });
  }

  onLimitChange(event: { value: number }) {
    this.reqClients.limit = event.value;
    const totalPages = Math.ceil(
      (this.totalPages * this.reqClients.limit) / event.value
    );
    if (this.reqClients.page >= totalPages) {
      this.reqClients.page = totalPages - 1;
    }

    this.getClients();
  }

  onPageChange(event: any) {
    console.log({ event });
    const page = event.page;

    if (page !== this.reqClients.page) {
      this.reqClients.page = page;
      this.reqClients.limit = event.rows;
      this.getClients();
    }
  }
}
