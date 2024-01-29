import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte24Component } from './reporte24.component';

describe('Reporte24Component', () => {
  let component: Reporte24Component;
  let fixture: ComponentFixture<Reporte24Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Reporte24Component]
    });
    fixture = TestBed.createComponent(Reporte24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
