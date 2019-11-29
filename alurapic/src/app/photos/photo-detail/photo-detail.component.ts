import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-photo-detail',
    templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {
    
    photo$: Observable<Photo>;
    photoId: number;
    
    constructor(private activateRoute: ActivatedRoute, private photoService: PhotoService, private router: Router){}
    
    ngOnInit(): void {
        const id = this.activateRoute.snapshot.params.id;
        this.photoId = id;
        this.photo$ = this.photoService.findById(id);        
    }

    remove() {
        this.photoService.removePhoto(this.photoId)
            .subscribe(() => this.router.navigate(['']));
    }
}