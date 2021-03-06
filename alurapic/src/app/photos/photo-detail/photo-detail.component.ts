import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { PhotoCommentPublisher } from './photo-comment/photo-comment.publisher';

@Component({
    selector: 'app-photo-detail',
    templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {
    
    photo$: Observable<Photo>;
    photoId: number;
    photoComments: number = 0;
    
    constructor(private activateRoute: ActivatedRoute, 
                private photoService: PhotoService, 
                private router: Router,
                private alertService: AlertService,
                private userService: UserService,
                private commentPublisher: PhotoCommentPublisher){}
    
    ngOnInit(): void {
        const id = this.activateRoute.snapshot.params.id;
        this.photoId = id;
        this.photo$ = this.photoService.findById(id);
        this.photo$.subscribe(
            (photo) => this.photoComments = photo.comments, 
            () => this.router.navigate(['not-found'])
        );
        
        this.commentPublisher.getNewCommentSubject()
            .subscribe(() => ++this.photoComments);
    }

    remove() {
        this.photoService.removePhoto(this.photoId)
            .subscribe(
                () => { 
                    this.alertService.success('Photo removed', true);
                    this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
                },
                () => this.alertService.warning('Could not delete the photo')
            );
    }

    like(photo: Photo) {
        this.photoService.like(photo.id)
            .subscribe(
                (liked) => {
                    if (liked) {
                        this.photo$ = this.photoService.findById(photo.id);
                    }
                });
    }
}