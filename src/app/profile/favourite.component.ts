import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { CoverService } from './../shared/services/cover.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Album } from '../shared/models/album.model';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
})
export class FavouriteComponent implements OnInit {
  isLoggedIn: boolean = false;
  firebaseFavouritesArray: Array<{ name: string; artist: string; date: Date }> =
    [];
  favouriteAlbums: Array<Album> = [];
  isLoading: boolean = false;
  isMobileScreen: boolean = false;

  constructor(
    private authService: AuthService,
    private coverService: CoverService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.isLoading = true;
    if (window.innerWidth < 768) this.isMobileScreen = true;
    this.isLoggedIn = this.authService.isSignedIn();
    if (this.isLoggedIn) {
      this.coverService.getAllFavourites().subscribe(
        (res) => {
          if (res) {
            this.firebaseFavouritesArray = res;
            for (const favorite in this.firebaseFavouritesArray) {
              let artist = this.firebaseFavouritesArray[favorite].artist;
              let albumName = this.firebaseFavouritesArray[favorite].name;
              let date = new Date(
                this.firebaseFavouritesArray[favorite].date
              ).getTime();
              this.coverService
                .getAlbumInfo(artist, albumName)
                .subscribe((res) => {
                  const data = res.album;
                  const album = new Album();
                  album.name = data.name;
                  album.artist = data.artist;
                  album.id = favorite;
                  album.date = date;
                  if (
                    data.image[3]['#text'] !== '' ||
                    data.image[3]['#text'] !== undefined
                  )
                    album.image = data.image[3]['#text'];
                  album.isInFavourites = true;
                  this.favouriteAlbums.push(album);
                  this.favouriteAlbums = this.favouriteAlbums.sort((a, b) => {
                    if (a.date > b.date) {
                      return 1;
                    } else if (a.date < b.date) {
                      return -1;
                    } else return 0;
                  });
                  this.isLoading = false;
                });
            }
            console.log(this.favouriteAlbums);
          } else {
            this.isLoading = false;
          }
        },
        (err) => {}
      );
    } else this.router.navigate(['/auth/signin']);
  }

  goToDetails(artist: string, album: string): void {
    this.router.navigate(['/covers/details'], {
      queryParams: { artist: artist, album: album },
    });
  }

  removeFromFavourites(album: Album): void {
    this.coverService.deleteAlbumFromFavourites(album.id).subscribe(
      (res) => {
        this.messageService.success(
          'Album successfully removed from favourites'
        );
        this.favouriteAlbums = this.favouriteAlbums.filter(
          (data) => data.artist + data.name !== album.artist + album.name
        );
      },
      (err) => {}
    );
  }
}
