import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Photo } from './photo/photo';
import { PhotoComment } from './photo/photo-comment';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(user: string): Observable<Photo[]> {
      return this.http.get<Photo[]>(API_URL + '/' + user + '/photos');
    }

    listFromUserPaginated(user: string, page: number) : Observable<Photo[]> {
      const params = new HttpParams().append('page', page.toString());
      return this.http.get<Photo[]>(API_URL + '/' + user + '/photos', { params } );
    }

    upload(description: string, allowComments: boolean, file: File) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('allowComments', allowComments ? 'true' : 'false');
      formData.append('imageFile', file);
      return this.http.post(API_URL + '/photos/upload', formData, { observe: 'events', reportProgress: true} );
    }

    findById(id: number) {
      return this.http.get<Photo>(API_URL + '/photos/' + id);
    }

    getComments(id: number) {
      return this.http.get<PhotoComment[]>(API_URL + '/photos/' + id + '/comments');
    }

    addComment(id: number, comment: string){
      return this.http.post( API_URL + '/photos/' + id + '/comments', { commentText: comment } );
    }

    removePhoto(id: number) {
      return this.http.delete( API_URL + '/photos/' + id);
    }

    like(id: number) {
      return this.http.post(API_URL + '/photos/' + id + '/like', {}, {observe: 'response'})
        .pipe( map(resp => true) )
        .pipe( catchError(err => {
          return err.status = '304' ? of(false) : throwError(err);
        }) );
    }
}
