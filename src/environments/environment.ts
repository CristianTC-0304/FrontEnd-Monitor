// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   host: "http://localhost",
  //host: "https://monitor-back.herokuapp.com",
  
  port: "8080",
  firebaseConfig: {
    apiKey: "AIzaSyDpH_q1XqhDLKyxHxFZOOkPKehoqXw4VFg",
    authDomain: "example-428ca.firebaseapp.com",
    databaseURL: "https://example-428ca.firebaseio.com",
    projectId: "example-428ca",
    storageBucket: "example-428ca.appspot.com",
    messagingSenderId: "363274100947",
    appId: "1:363274100947:web:434813a68124c47e"
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
