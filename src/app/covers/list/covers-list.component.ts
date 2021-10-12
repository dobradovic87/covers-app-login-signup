import { MessageService } from 'src/app/shared/services/message.service';
import { CoverService } from './../../shared/services/cover.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/shared/models/album.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Favourites } from 'src/app/shared/models/favourites.model';

@Component({
  selector: 'app-covers-list',
  templateUrl: './covers-list.component.html',
})
export class CoversListComponent implements OnInit {
  topAlbums: Array<Album> = [];
  isLoading: boolean = false;
  title: string = '';
  isMobileScreen: boolean = false;
  isLoggedIn: boolean = false;
  favouritesArray: Array<{ name: string; artist: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private coverService: CoverService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    window.scrollTo(0, 0);
    if (window.innerWidth < 768) this.isMobileScreen = true;
    this.isLoggedIn = this.authService.isSignedIn();
    this.route.queryParams.subscribe((params) => {
      this.isLoading = true;
      this.title = params.searchTitle;
      if (this.isLoggedIn) {
        this.coverService.getAllFavourites().subscribe((res) => {
          this.favouritesArray = res;
          this.searchTopAlbums();
        });
      } else this.searchTopAlbums();
    });
  }

  searchTopAlbums(): void {
    if (!this.isLoading) this.isLoading = true;
    this.topAlbums = [];
    this.coverService.getArtistTopAlbums(this.title).subscribe(
      (res) => {
        if (res.hasOwnProperty('topalbums')) {
          const results = res.topalbums.album;
          for (const data of results) {
            const album = new Album();
            if (
              data.name === '(null)' ||
              data.name === null ||
              data.name === 'null' ||
              data.name === '' ||
              data.name === undefined
            )
              album.name = '*No album name';
            else album.name = data.name;
            album.artist = data.artist.name;
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
          }
          this.isLoading = false;
        } else this.isLoading = false;
      },
      (err) => {}
    );
  }

  goToDetails(artist: string, album: string): void {
    if (album !== '*No album name') {
      this.router.navigate(['/covers/details'], {
        queryParams: { artist: artist, album: album },
      });
    } else
      this.messageService.error(
        "No album name and can't be redirected to details page"
      );
  }

  addToFavourites(album: Album): void {
    if (this.isLoggedIn && !album.isInFavourites) {
      this.topAlbums.map((data) => {
        if (
          album.name !== '*No album name' &&
          data.artist === album.artist &&
          data.name === album.name
        ) {
          let favourites = new Favourites();
          favourites.name = album.name;
          favourites.artist = album.artist;
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
        if (album.name === '*No album name')
          this.messageService.error(
            "Album can't be added to favourites because doesn't exist album name"
          );
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
