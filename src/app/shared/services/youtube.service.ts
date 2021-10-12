import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  API_URL: string = 'https://www.googleapis.com/youtube/v3/search';
  private youTubeApiKey: string = environment.youTubeApiKey;
  constructor(private http: HttpClient) {}

  searchYouTube(query: string): Observable<any> {
    return this.http.get(this.API_URL, {
      params: {
        key: this.youTubeApiKey,
        type: 'video',
        maxResults: '1',
        part: 'id, snippet',
        q: query,
      },
    });
  }
}
