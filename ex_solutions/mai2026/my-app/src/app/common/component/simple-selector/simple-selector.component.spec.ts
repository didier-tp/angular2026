import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSelectorComponent } from './simple-selector.component';

describe('SimpleSelectorComponent', () => {
  let component: SimpleSelectorComponent;
  let fixture: ComponentFixture<SimpleSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
