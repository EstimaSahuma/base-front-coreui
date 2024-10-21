import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

// Importando o HttpClientModule
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(
      SidebarModule, 
      DropdownModule, 
      HttpClientModule, 
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      NgxPaginationModule,
      FormsModule
    ),
    IconSetService,
    provideAnimations()
  ]
};
