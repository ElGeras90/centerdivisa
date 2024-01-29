import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltoriesgoComponent } from './altoriesgo.component';

describe('AltoriesgoComponent', () => {
  let component: AltoriesgoComponent;
  let fixture: ComponentFixture<AltoriesgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltoriesgoComponent]
    });
    fixture = TestBed.createComponent(AltoriesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
