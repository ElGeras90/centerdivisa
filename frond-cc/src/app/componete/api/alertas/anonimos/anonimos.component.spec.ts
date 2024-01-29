import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonimosComponent } from './anonimos.component';

describe('AnonimosComponent', () => {
  let component: AnonimosComponent;
  let fixture: ComponentFixture<AnonimosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnonimosComponent]
    });
    fixture = TestBed.createComponent(AnonimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
