import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortecajamComponent } from './cortecajam.component';

describe('CortecajamComponent', () => {
  let component: CortecajamComponent;
  let fixture: ComponentFixture<CortecajamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CortecajamComponent]
    });
    fixture = TestBed.createComponent(CortecajamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
