import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTrabajosComponent } from './historial-trabajos.component';

describe('HistorialTrabajosComponent', () => {
  let component: HistorialTrabajosComponent;
  let fixture: ComponentFixture<HistorialTrabajosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialTrabajosComponent]
    });
    fixture = TestBed.createComponent(HistorialTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
