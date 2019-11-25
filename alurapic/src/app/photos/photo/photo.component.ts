import { Component, Input } from '@angular/core';

const URL = 'http://localhost:3000/imgs/';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  private _url: string = '';

  @Input() description = '';

  @Input() set url(url: string) {
    if (!url.startsWith('data')) {
      this._url = URL + url;
    } else {
      this._url = url;
    }    
  }

  get url(): string {
    return this._url;
  }

}
