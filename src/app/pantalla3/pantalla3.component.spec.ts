import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla3Component } from './pantalla3.component';

describe('Pantalla3Component', () => {
  let component: Pantalla3Component;
  let fixture: ComponentFixture<Pantalla3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pantalla3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pantalla3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
