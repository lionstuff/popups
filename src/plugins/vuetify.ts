'use strict';

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      dark: true, // From 2.0 You have to select the theme dark or light here
      light: false,
      options: {
        themeCache: {
          get: ( key: any ) => localStorage.getItem( key ),
          set: ( key: any, value: any ) => localStorage.setItem( key, value ),
        },
      },
    },
  }
);
