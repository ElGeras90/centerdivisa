import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAlertasComponent } from './config-alertas.component';

describe('ConfigAlertasComponent', () => {
  let component: ConfigAlertasComponent;
  let fixture: ComponentFixture<ConfigAlertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAlertasComponent]
    });
    fixture = TestBed.createComponent(ConfigAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
