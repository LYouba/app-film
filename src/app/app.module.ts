import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialAngularModule } from './material-modules/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogLoginComponent } from './login/dialog-login/dialog-login.component';
import { LoginComponent } from './login/login.component';
import { DialogRegisterComponent } from './register/dialog-register/dialog-register.component';
import { FilmSerieModule } from './module-film-serie/film-serie.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DialogLoginComponent,
    LoginComponent,
    DialogRegisterComponent,
  ],
  imports: [
    FormsModule, // [(ngModule)]
    ReactiveFormsModule, // [formGroup]
    FilmSerieModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MaterialAngularModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
