import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisasComponent } from './divisas.component';

describe('DivisasComponent', () => {
  let component: DivisasComponent;
  let fixture: ComponentFixture<DivisasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisasComponent]
    });
    fixture = TestBed.createComponent(DivisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
