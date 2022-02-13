import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { base64ToFile } from 'ngx-image-cropper';
import { GenericService } from 'src/app/services/generic.service';
import { ImageCropperComponent } from '../image-cropper.component';

@Component({
  selector: 'cropper-button',
  templateUrl: './image-cropper-button.component.html',
  styleUrls: ['./image-cropper-button.component.scss']
})
export class ImageCropperButtonComponent implements OnInit {

  constructor(private dialog: MatDialog, private svc : GenericService) { }

  ngOnInit(): void {
  }

  openModal(){
    
  }

  saveFile(file){
    let form = new FormData();
    form.append('file', base64ToFile(file));
    this.svc.operation('UPLOAD_MY_AVATAR', form).subscribe(
      r=> { if(r) console.log(r);}
    )
  }

  fileChangeEvent(event: any): void {
    if(event.target.value)
    this.dialog.open(ImageCropperComponent, { maxHeight: 960, maxWidth: 960, data: {changedEvent: event}, panelClass: "file-dialog"}).afterClosed().subscribe(
      data => {
        if(data) this.saveFile(data)
      }
    )
  }

}
