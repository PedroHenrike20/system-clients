import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDoughnutDataComponent } from './chart-doughnut-data.component';

describe('ChartDoughnutDataComponent', () => {
  let component: ChartDoughnutDataComponent;
  let fixture: ComponentFixture<ChartDoughnutDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDoughnutDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDoughnutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
