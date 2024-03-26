import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'my-countries-9d5d6',
          appId: '1:855610291049:web:c202e8d415fd0fd28a83f8',
          storageBucket: 'my-countries-9d5d6.appspot.com',
          apiKey: 'AIzaSyAHjaDtGpPWty1E-81at_MVl6lEHxV_K2s',
          authDomain: 'my-countries-9d5d6.firebaseapp.com',
          messagingSenderId: '855610291049',
          measurementId: 'G-PKHGRRG2X3',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'my-countries-9d5d6',
          appId: '1:855610291049:web:c202e8d415fd0fd28a83f8',
          storageBucket: 'my-countries-9d5d6.appspot.com',
          apiKey: 'AIzaSyAHjaDtGpPWty1E-81at_MVl6lEHxV_K2s',
          authDomain: 'my-countries-9d5d6.firebaseapp.com',
          messagingSenderId: '855610291049',
          measurementId: 'G-PKHGRRG2X3',
        })
      )
    ),
    ScreenTrackingService,
    UserTrackingService,
    provideAnimationsAsync(),
  ],
};
