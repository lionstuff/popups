'use strict';

import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';
// import { getToken, onMessage  } from 'firebase/messaging';

const {
  VUE_APP_APIKEY,
  VUE_APP_AUTHDOMAIN,
  VUE_APP_DATABASEURL,
  VUE_APP_PROJECTID,
  VUE_APP_STORAGEBUCKET,
  VUE_APP_MESSAGINGSENDERID,
  VUE_APP_APPID,
  VUE_APP_MEASUREMENTID,
  VUE_APP_VAPID,
} = process.env;

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebase = initializeApp( {
  apiKey: VUE_APP_APIKEY,
  authDomain: VUE_APP_AUTHDOMAIN,
  databaseURL: VUE_APP_DATABASEURL,
  projectId: VUE_APP_PROJECTID,
  storageBucket: VUE_APP_STORAGEBUCKET,
  messagingSenderId: VUE_APP_MESSAGINGSENDERID,
  appId: VUE_APP_APPID,
  measurementId: VUE_APP_MEASUREMENTID,
} );

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging( firebase );

// getToken( messaging, { vapidKey: VUE_APP_VAPID } ).then( ( currentToken ) => {
//   if ( currentToken ) {
//     // Send the token to your server and update the UI if necessary
//     // ...
//     console.log( { currentToken } );
//   } else {
//     // Show permission request UI
//     console.log( 'No registration token available. Request permission to generate one.' );
//     // ...
//   }
// } ).catch( ( err ) => {
//   console.log( 'An error occurred while retrieving token. ', err );
//   // ...
// } );

export default {
  install: ( app: any, options: any ) => {
    // app.config.globalProperties.messaging = messaging;
    app.config.globalProperties.firebase = firebase;
    app.provide( 'firebase', options );
  },
};
