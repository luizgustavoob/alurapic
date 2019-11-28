import { NgModule } from '@angular/core';
import { PhotoDetailComponent } from './photo-detail.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentComponent } from './photo-comment/photo-comment.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'src/app/shared/components/message/message.module';

@NgModule({
    declarations: [
        PhotoDetailComponent,
        PhotoCommentComponent
    ],
    imports: [
        CommonModule, 
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        MessageModule
    ],
    exports: [
        PhotoDetailComponent,
        PhotoCommentComponent
    ]
})
export class PhotoDetailModule{}