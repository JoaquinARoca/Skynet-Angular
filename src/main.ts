import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutesModule } from './app/app.routes';
import { TokenInterceptor } from './app/interceptors/token.interceptor';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, AppRoutesModule,FormsModule,CommonModule,FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    TokenInterceptor
  ]
}).catch(err => console.error(err));

