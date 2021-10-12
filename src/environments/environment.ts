// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // add your firebaseConfig here
  },
  production: false,
  apiKey: '8960814a99312e10f3209b628cd9784d',
  topArtistUrl:
    'https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&format=json&limit=20',
  topAlbumsUrl:
    'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&format=json&limit=30&artist=',
  albumInfoUrl:
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json',
  //youTubeApiKey: 'your YouTube API key',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
