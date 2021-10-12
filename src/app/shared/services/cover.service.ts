import { User } from 'src/app/shared/models/user.model';
import { Favourites } from './../models/favourites.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoverService {
  apiKey: string = environment.apiKey;
  topArtistUrl: string = environment.topArtistUrl;
  topAlbumsUrl: string = environment.topAlbumsUrl;
  albumInfoUrl: string = environment.albumInfoUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTopAlbumsByTag(): Observable<any> {
    return this.http.get(`${this.topArtistUrl}&api_key=${this.apiKey}`);
  }

  getArtistTopAlbums(query: string): Observable<any> {
    return this.http.get(`${this.topAlbumsUrl}${query}&api_key=${this.apiKey}`);
  }

  getAlbumInfo(artist: string, album: string): Observable<any> {
    return this.http.get(
      `${this.albumInfoUrl}&api_key=${this.apiKey}&artist=${artist}&album=${album}`
    );
  }

  addAlbumToFavourites(favourites: Favourites): Observable<any> {
    let user = new User();
    user = this.authService.getUser();
    return this.http.post(
      `https://covers-search-94ab7-default-rtdb.firebaseio.com/favourites/${user.localId}.json?auth=${user.idToken}`,
      favourites
    );
  }

  getAllFavourites(): Observable<any> {
    let token = this.authService.getAccessToken();
    let user = new User();
    user = this.authService.getUser();
    return this.http.get(
      `https://covers-search-94ab7-default-rtdb.firebaseio.com/favourites/${user.localId}.json?auth=${token}`
    );
  }

  deleteAlbumFromFavourites(id: string): Observable<any> {
    let user = new User();
    user = this.authService.getUser();
    return this.http.delete(
      `https://covers-search-94ab7-default-rtdb.firebaseio.com/favourites/${user.localId}/${id}.json?auth=${user.idToken}`
    );
  }
}
