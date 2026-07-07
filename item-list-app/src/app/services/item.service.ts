import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '../models/item.model';

/**
 * ItemService simulates fetching a list of items from a backend.
 * In a real application, this would use HttpClient to call an API endpoint.
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly mockItems: Item[] = [
    { id: 1, name: 'Laptop', description: 'A portable computer for work and play.' },
    { id: 2, name: 'Coffee Mug', description: 'Ceramic mug that keeps your coffee warm.' },
    { id: 3, name: 'Desk Lamp', description: 'Adjustable LED lamp for your workspace.' },
    { id: 4, name: 'Notebook', description: 'A hardcover notebook for jotting down ideas.' },
    { id: 5, name: 'Headphones', description: 'Noise-cancelling headphones for focused work.' }
  ];

  /**
   * Toggle this to true to simulate a failed request (e.g. for testing
   * the component's error handling path).
   */
  public simulateError = false;

  /**
   * Fetches the list of items.
   * Returns an Observable so callers can subscribe and handle
   * success/error states, similar to a real HTTP call.
   */
  getItems(): Observable<Item[]> {
    if (this.simulateError) {
      return throwError(() => new Error('Failed to fetch items from the server.')).pipe(delay(500));
    }

    // Simulate network latency
    return of(this.mockItems).pipe(delay(500));
  }
}
