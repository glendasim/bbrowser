// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //Add firebase config
  firebase:{
    apiKey: "AIzaSyBFa70W9l5oJxWsF2Bxujhe2JZa5rcQy64",
    authDomain: "bookbrowser-d739d.firebaseapp.com",
    databaseURL: "https://bookbrowser-d739d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bookbrowser-d739d",
    storageBucket: "bookbrowser-d739d.appspot.com",
    messagingSenderId: "916623385696",
    appId: "1:916623385696:web:40dab74519f16eb76c0f05",
    measurementId: "G-R5KNHH4NVD"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
