// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'covers-search-94ab7',
    appId: '1:466808810342:web:c848363fec07b67d6276a7',
    databaseURL: 'https://covers-search-94ab7-default-rtdb.firebaseio.com',
    storageBucket: 'covers-search-94ab7.appspot.com',
    apiKey: 'AIzaSyDYQwmQQqbqLsbmMuwRwVdfXF46QsuDywA',
    authDomain: 'covers-search-94ab7.firebaseapp.com',
    messagingSenderId: '466808810342',
    measurementId: 'G-WTBY2QN87L',
  },
  production: false,
  apiKey: '8960814a99312e10f3209b628cd9784d',
  topArtistUrl:
    'https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&format=json&limit=20',
  topAlbumsUrl:
    'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&format=json&limit=30&artist=',
  albumInfoUrl:
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json',
  youTubeApiKey: 'AIzaSyARA9__SPutUAS5xWYVw68SX80YIgd8l_0',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
