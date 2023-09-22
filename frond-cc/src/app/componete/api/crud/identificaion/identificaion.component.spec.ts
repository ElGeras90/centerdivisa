import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificaionComponent } from './identificaion.component';

describe('IdentificaionComponent', () => {
  let component: IdentificaionComponent;
  let fixture: ComponentFixture<IdentificaionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificaionComponent]
    });
    fixture = TestBed.createComponent(IdentificaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
