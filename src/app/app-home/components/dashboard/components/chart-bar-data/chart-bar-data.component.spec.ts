import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarDataComponent } from './chart-bar-data.component';

describe('ChartBarDataComponent', () => {
  let component: ChartBarDataComponent;
  let fixture: ComponentFixture<ChartBarDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
