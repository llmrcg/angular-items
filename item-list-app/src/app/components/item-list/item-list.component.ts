import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private readonly itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  /**
   * Fetches items from ItemService and updates component state.
   * Handles both the loading and error states so the template
   * can render an appropriate UI at every stage.
   */
  loadItems(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'An unexpected error occurred while loading items.';
        this.isLoading = false;
      }
    });
  }
}
