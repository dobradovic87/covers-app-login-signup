import { YouTubeService } from './../../shared/services/youtube.service';
import { Track } from './../../shared/models/track.model';
import { CoverService } from './../../shared/services/cover.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/shared/models/album.model';

@Component({
  selector: 'app-details',
  templateUrl: './cover-details.component.html',
})
export class CoverDetailsComponent implements OnInit {
  isMobileScreen: boolean = false;
  isLoading: boolean = false;
  artist: string = '';
  album: string = '';
  videoId: string = '';
  searchQuery: string = '';
  videoUrl: string = 'https://www.youtube.com/embed/';
  mobileVideoUrl: string = 'https://www.youtube.com/watch_popup/';
  albumInfo: Album = new Album();
  arrayOfTracks: Array<Track> = [];
  arrayOfTags: Array<string> = [];
  hasVideo: boolean;
  isMobileVideo: boolean;

  constructor(
    private route: ActivatedRoute,
    private coverService: CoverService,
    private router: Router,
    private videoService: YouTubeService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (window.innerWidth < 768) this.isMobileScreen = true;
    this.route.queryParams.subscribe((params) => {
      this.artist = params.artist;
      this.album = params.album;
    });
    this.isLoading = true;
    this.coverService.getAlbumInfo(this.artist, this.album).subscribe((res) => {
      this.albumInfo.artist = res.album.artist;
      this.albumInfo.name = res.album.name;
      if (res.album.hasOwnProperty('wiki'))
        this.albumInfo.summary = res.album.wiki.summary;
      else this.albumInfo.summary = '*No album sumary';
      if (res.album.hasOwnProperty('tracks')) {
        for (const track of res.album.tracks.track) {
          const newTrack = new Track();
          newTrack.name = track.name;
          newTrack.duration = track.duration;
          this.arrayOfTracks.push(newTrack);
        }
        this.albumInfo.tracks = this.arrayOfTracks;
      }
      if (
        res.album.image[3]['#text'] !== '' ||
        res.album.image[3]['#text'] !== undefined
      )
        this.albumInfo.image = res.album.image[3]['#text'];
      this.isLoading = false;
    });
  }

  youTubeSearch(artist: string, track: string): void {
    this.searchQuery = `${artist} ${track}`;

    this.videoService.searchYouTube(this.searchQuery).subscribe((res) => {
      this.videoId = res.items[0].id.videoId;
      this.videoUrl =
        'https://www.youtube.com/embed/' + this.videoId + '?autoplay=1';
      this.hasVideo = true;
      if (this.isMobileScreen) {
        this.isMobileVideo = true;
        document.body.style.overflow = 'hidden';
        document.getElementById('home-bg').style.background = 'black';
      }
    });
  }

  closeVideo(): void {
    this.hasVideo = false;
    this.isMobileVideo = false;
    document.getElementById('home-bg').style.background = '#2b3e50';
    document.body.style.overflow = 'auto';
  }
}
