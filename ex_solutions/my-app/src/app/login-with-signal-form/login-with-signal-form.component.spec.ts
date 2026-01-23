import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithSignalFormComponent } from './login-with-signal-form.component';

describe('LoginWithSignalFormComponent', () => {
  let component: LoginWithSignalFormComponent;
  let fixture: ComponentFixture<LoginWithSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWithSignalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
