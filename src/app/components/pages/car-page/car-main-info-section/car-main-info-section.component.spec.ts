import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMainInfoSectionComponent } from './car-main-info-section.component';

describe('CarMainInfoSectionComponent', () => {
  let component: CarMainInfoSectionComponent;
  let fixture: ComponentFixture<CarMainInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarMainInfoSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarMainInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
