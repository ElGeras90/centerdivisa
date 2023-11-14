import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BobedaComponent } from './bobeda.component';

describe('BobedaComponent', () => {
  let component: BobedaComponent;
  let fixture: ComponentFixture<BobedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BobedaComponent]
    });
    fixture = TestBed.createComponent(BobedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
