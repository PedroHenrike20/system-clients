import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientDTO } from '../../models/client.model';
import { SelectionService } from '../../services/selection-service/selection.service';
import { HeaderService } from 'src/app/pages/app-home/services/header-service/header.service';

@Component({
  selector: 'app-card-information-client',
  templateUrl: './card-information-client.component.html',
  styleUrls: ['./card-information-client.component.scss']
})
export class CardInformationClientComponent {
  @Input() client!: ClientDTO;
  @Input() submenu!: 'clients' | 'client_selected';
  @Output() onSelect = new EventEmitter<() => void>();
  @Output() onEdit = new EventEmitter<() => void>();
  @Output() onDelete = new EventEmitter<() => void>();

  constructor(private selectionService: SelectionService, private headerService: HeaderService) {}

  get isSelected(): boolean {
    return this.selectionService.isItemSelected(this.client.id);
  }

  get submenuClientSelected(): boolean {
    return this.submenu === 'client_selected';
  }

  removeSelectionClient() {
    this.selectionService.toggleItemSelection(this.client);
  }

  

}
