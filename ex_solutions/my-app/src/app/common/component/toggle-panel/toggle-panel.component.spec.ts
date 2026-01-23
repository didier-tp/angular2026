import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePanelComponent } from './toggle-panel.component';

describe('TogglePanelComponent', () => {
  let component: TogglePanelComponent;
  let fixture: ComponentFixture<TogglePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TogglePanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
