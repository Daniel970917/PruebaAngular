import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla4Component } from './pantalla4.component';

describe('Pantalla4Component', () => {
  let component: Pantalla4Component;
  let fixture: ComponentFixture<Pantalla4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pantalla4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pantalla4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
