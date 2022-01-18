'use strict';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';
import { loadFonts } from './plugins/webfontloader';
import './registerServiceWorker';

loadFonts();

createApp( App )
  .use( vuetify )
  .use( firebase )
  .mount( '#app' );
