import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleDetailsModalPage } from './sale-details-modal.page';

describe('SaleDetailsModalPage', () => {
  let component: SaleDetailsModalPage;
  let fixture: ComponentFixture<SaleDetailsModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
