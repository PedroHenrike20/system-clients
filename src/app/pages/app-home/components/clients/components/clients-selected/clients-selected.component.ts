import { Component } from '@angular/core';
import { ClientDTO } from '../../models/client.model';
import { SelectionService } from '../../services/selection-service/selection.service';

@Component({
  selector: 'app-clients-selected',
  templateUrl: './clients-selected.component.html',
  styleUrls: ['./clients-selected.component.scss']
})
export class ClientsSelectedComponent {

  selectedClients: ClientDTO[] = [];

  constructor(private selectionService: SelectionService) {}

  get visibleClearButton(): boolean {
    return this.selectedClients.length > 0
  }

  ngOnInit(){
    this.selectionService.selectedItems$.subscribe(
      (items) => {
        this.selectedClients = items;
      }
    )
  }

  clearClientsSelected(){
    this.selectionService.clearSelection();
  }

}
