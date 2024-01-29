import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovComponent } from './mov.component';

describe('MovComponent', () => {
  let component: MovComponent;
  let fixture: ComponentFixture<MovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovComponent]
    });
    fixture = TestBed.createComponent(MovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
