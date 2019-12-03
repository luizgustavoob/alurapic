import { NgModule } from '@angular/core';
import { ShowIfLoggedDirective } from './show-if-logged.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ShowIfLoggedDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShowIfLoggedDirective
    ]
})
export class ShowIfLoggedModule { }