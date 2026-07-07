import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;

  const mockItems: Item[] = [
    { id: 1, name: 'Test Item', description: 'A test description' }
  ];

  beforeEach(async () => {
    itemServiceSpy = jasmine.createSpyObj('ItemService', ['getItems']);

    await TestBed.configureTestingModule({
      imports: [ItemListComponent],
      providers: [{ provide: ItemService, useValue: itemServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    itemServiceSpy.getItems.and.returnValue(of(mockItems));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load items successfully', () => {
    itemServiceSpy.getItems.and.returnValue(of(mockItems));
    fixture.detectChanges();
    expect(component.items).toEqual(mockItems);
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBeNull();
  });

  it('should handle errors when fetching items fails', () => {
    itemServiceSpy.getItems.and.returnValue(throwError(() => new Error('Network error')));
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Network error');
    expect(component.isLoading).toBeFalse();
    expect(component.items).toEqual([]);
  });
});
