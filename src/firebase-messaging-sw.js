'use strict';
/* eslint-disable no-undef, no-restricted-globals */

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

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';

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

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging( firebase );

onBackgroundMessage( ( messaging, payload ) => {
  console.log( '[firebase-messaging-sw.js] Received background message ', payload );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification( notificationTitle, notificationOptions );
} );

// module.exports.messaging = messaging;

// // This is the code piece that GenerateSW mode can't provide for us.
// // This code listens for the user's confirmation to update the app.

// self.addEventListener( 'message', event => {
//   console.log( event );
//   if ( event.data && event.data.type === 'SKIP_WAITING' ) {
//     self.skipWaiting();
//   }
// } );

// workbox.clientsClaim();

// // The precaching code provided by Workbox.
// self.__precacheManifest = [].concat( self.__precacheManifest || [] );
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute( self.__precacheManifest, {} );
