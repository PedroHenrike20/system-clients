import { Component } from '@angular/core';
import { ClientDTO, ReqClientListDTO } from '../../../../models/client.model';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/app-home/services/client-service/client.service';
import { SelectionService } from 'src/app/app-home/services/selection-service/selection.service';

@Component({
  selector: 'app-clients-management',
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.scss'],
})
export class ClientsManagementComponent {
  clients: ClientDTO[] = [];
  totalRecords: number = 0;
  reqClients: ReqClientListDTO = {
    limit: 10,
    page: 1,
  };
  dialogVisible = false;
  dialogTitle = '';
  dialogContent = '';
  confirmButtonText = '';
  isLoading: boolean = false;
  isLoadingOperation: boolean = false;
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
    this.isLoading = true;
    this.clientService.getClients(this.reqClients).subscribe({
      next: (response) => {
        this.clients = response.clients;
        this.totalRecords = response.totalPages * this.reqClients.limit;
        this.isLoading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message || 'Erro ao carregar os clientes',
        });
        this.isLoading = false;
      },
    });
  }

  onLimitChange(event: { value: number }) {
    this.reqClients.limit = event.value;
    this.reqClients.page = 1;

    this.getClients();
  }

  onPageChange(event: any) {
    const page = event.page;
    this.reqClients.page = page + 1;
    this.reqClients.limit = event.rows;
    this.getClients();
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
    this.isLoadingOperation = true;
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
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente excluído com sucesso!',
        });
        this.dialogVisible = false;
        this.selectionService.removeIfDeleted(this.clientSelected?.id!);
        this.isLoadingOperation = false;
        this.getClients();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
        this.isLoadingOperation = false;
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
        this.isLoadingOperation = false;
        this.getClients();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
        this.isLoadingOperation = false;
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
        this.isLoadingOperation = false;
        this.getClients();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message,
        });
        this.isLoadingOperation = false;
      },
    });
  }
}
