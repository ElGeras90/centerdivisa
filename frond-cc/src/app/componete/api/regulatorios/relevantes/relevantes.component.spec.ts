import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantesComponent } from './relevantes.component';

describe('RelevantesComponent', () => {
  let component: RelevantesComponent;
  let fixture: ComponentFixture<RelevantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelevantesComponent]
    });
    fixture = TestBed.createComponent(RelevantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
