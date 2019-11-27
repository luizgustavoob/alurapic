import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo';

const API_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(user: string): Observable<Photo[]> {
      return this.http.get<Photo[]>(API_URL + user + '/photos');
    }

    listFromUserPaginated(user: string, page: number) : Observable<Photo[]> {
      const params = new HttpParams().append('page', page.toString());
      return this.http.get<Photo[]>(API_URL + user + '/photos', { params } );
    }

    upload(description: string, allowComments: boolean, file: File) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('allowComments', allowComments ? 'true' : 'false');
      formData.append('imageFile', file);
      return this.http.post(API_URL + 'photos/upload', formData);
    }

    findById(id: string) {
      return this.http.get<Photo>(API_URL + 'photos/' + id);
    }
}
