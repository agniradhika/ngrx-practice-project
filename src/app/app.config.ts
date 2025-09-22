import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './store/employee.reducer';
import { employeeEffect } from './store/employee.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(), 
    provideToastr(), 
    provideAnimations(), 
    provideStore({'employee': employeeReducer}), 
    provideEffects(employeeEffect), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],
};
