import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenSlideComponent } from './imagen-slide.component';

describe('ImagenSlideComponent', () => {
  let component: ImagenSlideComponent;
  let fixture: ComponentFixture<ImagenSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
