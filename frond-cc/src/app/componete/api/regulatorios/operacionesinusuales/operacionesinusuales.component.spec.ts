import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesinusualesComponent } from './operacionesinusuales.component';

describe('OperacionesinusualesComponent', () => {
  let component: OperacionesinusualesComponent;
  let fixture: ComponentFixture<OperacionesinusualesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperacionesinusualesComponent]
    });
    fixture = TestBed.createComponent(OperacionesinusualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
