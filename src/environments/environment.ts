import { config } from 'rxjs';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appID: '9cca1a6caad0b110dfd2ea977588792f',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather?q=',
  forecastUrl: 'http://api.openweathermap.org/data/2.5/forecast?q=',
  config: {
    apiKey: "AIzaSyDxNDPPwPLy7b8JMbAxlm1AUpL2q54HEnA",
    authDomain: "lala-fafa4.firebaseapp.com",
    databaseURL: "https://lala-fafa4.firebaseio.com",
    projectId: "lala-fafa4",
    storageBucket: "lala-fafa4.appspot.com",
    messagingSenderId: "593822862812",
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
