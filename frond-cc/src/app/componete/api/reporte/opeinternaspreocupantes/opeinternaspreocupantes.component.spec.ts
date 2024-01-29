import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeinternaspreocupantesComponent } from './opeinternaspreocupantes.component';

describe('OpeinternaspreocupantesComponent', () => {
  let component: OpeinternaspreocupantesComponent;
  let fixture: ComponentFixture<OpeinternaspreocupantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeinternaspreocupantesComponent]
    });
    fixture = TestBed.createComponent(OpeinternaspreocupantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
