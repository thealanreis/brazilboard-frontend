import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  saveMethod: Function;
  imageChangedEvent: any = '';
  croppedImage: any = '';


  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.saveMethod = this.data['saveMethod'];
    this.imageChangedEvent = this.data['changedEvent'];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }


}
