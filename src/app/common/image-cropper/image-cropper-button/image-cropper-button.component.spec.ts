import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropperButtonComponent } from './image-cropper-button.component';

describe('ImageCropperButtonComponent', () => {
  let component: ImageCropperButtonComponent;
  let fixture: ComponentFixture<ImageCropperButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCropperButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
