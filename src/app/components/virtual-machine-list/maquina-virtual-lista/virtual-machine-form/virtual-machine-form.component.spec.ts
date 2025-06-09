import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualMachineFormComponent } from './virtual-machine-form.component';

describe('VirtualMachineFormComponent', () => {
  let component: VirtualMachineFormComponent;
  let fixture: ComponentFixture<VirtualMachineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualMachineFormComponent]
    });
    fixture = TestBed.createComponent(VirtualMachineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
