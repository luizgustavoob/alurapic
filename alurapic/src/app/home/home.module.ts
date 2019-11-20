import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { MessageModule } from '../shared/components/message/message.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MessageModule
    ]
})
export class HomeModule { }