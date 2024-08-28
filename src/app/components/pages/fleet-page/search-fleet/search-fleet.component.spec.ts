import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFleetComponent } from './search-fleet.component';

describe('SearchFleetComponent', () => {
  let component: SearchFleetComponent;
  let fixture: ComponentFixture<SearchFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFleetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
