/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDiXc50ty2qIgoRoTaNZn7DRv_MYUH0bNk",
    authDomain: "furniture-webapp.firebaseapp.com",
    databaseURL: "https://furniture-webapp.firebaseio.com",
    projectId: "furniture-webapp",
    storageBucket: "furniture-webapp.appspot.com",
    messagingSenderId: "1088789492799",
    appId: "1:1088789492799:web:682d9bfbe778389f74f48a",
    measurementId: "G-93ZDC4D4LZ"
  }

};
