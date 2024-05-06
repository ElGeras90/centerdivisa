import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalertComponent } from './galert.component';

describe('GalertComponent', () => {
  let component: GalertComponent;
  let fixture: ComponentFixture<GalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalertComponent]
    });
    fixture = TestBed.createComponent(GalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
