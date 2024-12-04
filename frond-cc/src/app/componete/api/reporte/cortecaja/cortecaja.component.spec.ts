import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortecajaComponent } from './cortecaja.component';

describe('CortecajaComponent', () => {
  let component: CortecajaComponent;
  let fixture: ComponentFixture<CortecajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CortecajaComponent]
    });
    fixture = TestBed.createComponent(CortecajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
