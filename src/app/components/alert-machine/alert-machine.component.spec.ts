import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMachineComponent } from './alert-machine.component';

describe('AlertMachineComponent', () => {
  let component: AlertMachineComponent;
  let fixture: ComponentFixture<AlertMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
