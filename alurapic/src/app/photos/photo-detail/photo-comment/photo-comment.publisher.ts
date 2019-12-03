import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PhotoCommentPublisher {

    newCommentSubject: Subject<boolean> = new Subject<boolean>();
    
    newComment() {
        this.newCommentSubject.next(true);
    }

    getNewCommentSubject() {
        return this.newCommentSubject.asObservable();
    }
}