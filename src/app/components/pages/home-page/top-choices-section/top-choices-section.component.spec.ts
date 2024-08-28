import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopChoicesSectionComponent } from './top-choices-section.component';

describe('TopChoicesSectionComponent', () => {
  let component: TopChoicesSectionComponent;
  let fixture: ComponentFixture<TopChoicesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopChoicesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopChoicesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
