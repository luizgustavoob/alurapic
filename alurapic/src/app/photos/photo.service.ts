import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo';

const url = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(user: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(url + user + '/photos');
  }

  listFromUserPaginated(user: string, page: number) : Observable<Photo[]> {
    const params = new HttpParams().append('page', page.toString());
    return this.http.get<Photo[]>(url + user + '/photos', { params } );
  }


}
