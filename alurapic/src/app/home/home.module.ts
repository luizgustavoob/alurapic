import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from '../shared/components/message/message.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MessageModule,
        RouterModule
    ]
})
export class HomeModule { }