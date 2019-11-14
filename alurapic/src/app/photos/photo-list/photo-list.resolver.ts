import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Photo } from "../photo";
import { Injectable } from "@angular/core";
import { PhotoService } from "../photo.service";

@Injectable({
  providedIn: 'root'
})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private photoService: PhotoService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const userName = route.params.userName;
        return this.photoService.listFromUserPaginated(userName, 1);
    }

}