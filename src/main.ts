import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { PreloadAllModules,provideRouter,
  withDebugTracing,withPreloading,withRouterConfig } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { routes } from './app.routes';
import { Routes } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
