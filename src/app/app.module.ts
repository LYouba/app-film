import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FilmComponent } from './components/film/film.component';
import { ListFilmComponent } from './components/list-film/list-film.component';
import { ListNouveauFilmComponent } from './components/list-nouveau-film/list-nouveau-film.component';
import { DetailsFilmComponent } from './components/details-film/details-film.component';
import { TimePipe } from './pipes/time.pipe';
import { MaterialAngularModule } from './material-modules/material.module';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { SerieComponent } from './components/serie/serie.component';
import { StringPipe } from './pipes/string.pipe';
import { GenreComponent } from './components/genre/genre.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilmComponent,
    ListFilmComponent,
    ListNouveauFilmComponent,
    DetailsFilmComponent,
    TimePipe,
    ListSerieComponent,
    DetailsSerieComponent,
    SerieComponent,
    StringPipe,
    GenreComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MaterialAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
