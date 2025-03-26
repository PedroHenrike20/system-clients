import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoCustomersComponent } from './card-info-customers.component';

describe('CardInfoCustomersComponent', () => {
  let component: CardInfoCustomersComponent;
  let fixture: ComponentFixture<CardInfoCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
