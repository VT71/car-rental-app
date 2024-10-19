import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from '../environments/environment.development';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withInMemoryScrolling({ anchorScrolling: 'enabled' }),
            withComponentInputBinding()
        ),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authHttpInterceptorFn])),
        provideAuth0({
            ...environment.auth0,
            // To uncomment when adding authorized calls
            //   httpInterceptor: {
            //     allowedList: [`${environment.api.serverUrl}/Car`],
            //   },
        }),
    ],
};
