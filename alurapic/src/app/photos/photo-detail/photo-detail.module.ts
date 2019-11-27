import { NgModule } from '@angular/core';
import { PhotoDetailComponent } from './photo-detail.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [PhotoDetailComponent],
    imports: [
        CommonModule, 
        PhotoModule
    ],
    exports: [PhotoDetailComponent]
})
export class PhotoDetailModule{}