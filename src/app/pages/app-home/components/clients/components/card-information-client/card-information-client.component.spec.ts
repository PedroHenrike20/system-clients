import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInformationClientComponent } from './card-information-client.component';

describe('CardInformationClientComponent', () => {
  let component: CardInformationClientComponent;
  let fixture: ComponentFixture<CardInformationClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInformationClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInformationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
