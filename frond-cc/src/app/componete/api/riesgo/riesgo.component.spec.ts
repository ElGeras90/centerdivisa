import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoComponent } from './riesgo.component';

describe('RiesgoComponent', () => {
  let component: RiesgoComponent;
  let fixture: ComponentFixture<RiesgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiesgoComponent]
    });
    fixture = TestBed.createComponent(RiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
