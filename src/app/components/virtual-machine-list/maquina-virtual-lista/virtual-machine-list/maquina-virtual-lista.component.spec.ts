import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaVirtualListaComponent } from './maquina-virtual-lista.component';

describe('MaquinaVirtualListaComponent', () => {
  let component: MaquinaVirtualListaComponent;
  let fixture: ComponentFixture<MaquinaVirtualListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaquinaVirtualListaComponent]
    });
    fixture = TestBed.createComponent(MaquinaVirtualListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
