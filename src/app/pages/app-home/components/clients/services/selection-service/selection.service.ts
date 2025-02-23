import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientDTO } from '../../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectedItemsSubject = new BehaviorSubject<ClientDTO[]>([]);
  selectedItems$ = this.selectedItemsSubject.asObservable();

  private selectedItemIds = new Set<number>();

  toggleItemSelection(item: ClientDTO) {
    const items = this.selectedItemsSubject.getValue();
    const index = items.findIndex(i => i.id === item.id);

    if (index === -1) {
      this.selectedItemsSubject.next([...items, item]);
      this.selectedItemIds.add(item.id!);
    } else {
      const newItems = items.filter(i => i.id !== item.id);
      this.selectedItemsSubject.next(newItems);
      this.selectedItemIds.delete(item.id);
    }
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItemIds.has(itemId);
  }

  clearSelection() {
    this.selectedItemsSubject.next([]);
    this.selectedItemIds.clear();
  }
}
