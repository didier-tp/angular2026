import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutableComponent } from './mutable.component';

describe('MutableComponent', () => {
  let component: MutableComponent;
  let fixture: ComponentFixture<MutableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
