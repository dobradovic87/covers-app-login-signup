import { MessageService } from 'src/app/shared/services/message.service';
import { Favourites } from './../shared/models/favourites.model';
import { Router } from '@angular/router';
import { Album } from './../shared/models/album.model';
import { Component, OnInit } from '@angular/core';
import { CoverService } from '../shared/services/cover.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  topAlbums: Array<Album> = [];
  isMobileScreen: boolean = false;
  isLoading: boolean = false;
  isInFavourites: boolean = false;
  isLoggedIn: boolean = false;
  favouritesArray: Array<{ name: string; artist: string }> = [];

  constructor(
    private coverService: CoverService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 768) this.isMobileScreen = true;
    this.isLoading = true;
    this.isLoggedIn = this.authService.isSignedIn();
    if (this.isLoggedIn) {
      this.coverService.getAllFavourites().subscribe((res) => {
        this.favouritesArray = res;
        this.fetchTopAlbumsByTag();
      });
    } else this.fetchTopAlbumsByTag();
  }

  fetchTopAlbumsByTag(): void {
    this.coverService.getTopAlbumsByTag().subscribe(
      (res) => {
        const results = res.albums.album;
        for (const data of results) {
          const album = new Album();
          album.name = data.name;
          album.artist = data.artist.name;
          album.isInFavourites = false;
          if (
            data.image[3]['#text'] !== '' ||
            data.image[3]['#text'] !== undefined
          )
            album.image = data.image[3]['#text'];

          if (this.isLoggedIn) {
            for (const favorite in this.favouritesArray) {
              if (
                this.favouritesArray[favorite].name === album.name &&
                this.favouritesArray[favorite].artist === album.artist
              ) {
                album.isInFavourites = true;
                album.id = favorite;
              }
            }
          }
          this.topAlbums.push(album);
          this.isLoading = false;
        }
      },
      (err) => {}
    );
  }

  goToDetails(artist: string, album: string): void {
    this.router.navigate(['/covers/details'], {
      queryParams: { artist: artist, album: album },
    });
  }

  addToFavourites(album: Album): void {
    if (this.isLoggedIn && !album.isInFavourites) {
      this.topAlbums.map((data) => {
        if (data.artist === album.artist && data.name === album.name) {
          let favourites = new Favourites();
          let date = new Date();
          favourites.name = album.name;
          favourites.artist = album.artist;
          favourites.date = date;
          this.coverService
            .addAlbumToFavourites(favourites)
            .subscribe((res) => {
              data.id = res.name;
              album.id = res.name;
              this.messageService.success(
                'Album successfully added to favourites'
              );
            });
          data.isInFavourites = true;
        }
      });
    } else if (this.isLoggedIn && album.isInFavourites) {
      this.coverService.deleteAlbumFromFavourites(album.id).subscribe(
        (res) => {
          this.messageService.success(
            'Album successfully removed from favourites'
          );
        },
        (err) => {}
      );
      this.topAlbums.map((data) => {
        if (data.artist === album.artist && data.name === album.name) {
          data.isInFavourites = false;
        }
      });
    } else this.router.navigate(['/auth/signin']);
  }
}
