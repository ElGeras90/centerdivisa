import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InusualesComponent } from './inusuales.component';

describe('InusualesComponent', () => {
  let component: InusualesComponent;
  let fixture: ComponentFixture<InusualesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InusualesComponent]
    });
    fixture = TestBed.createComponent(InusualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
