import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PhotoCommentService {

    newCommentSubject: Subject<boolean> = new Subject<boolean>();
    
    next() {
        this.newCommentSubject.next(true);
    }

    getNewCommentSubject() {
        return this.newCommentSubject.asObservable();
    }
}