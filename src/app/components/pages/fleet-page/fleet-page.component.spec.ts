import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetPageComponent } from './fleet-page.component';

describe('FleetPageComponent', () => {
  let component: FleetPageComponent;
  let fixture: ComponentFixture<FleetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FleetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
