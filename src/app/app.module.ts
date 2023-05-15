import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FilmComponent } from './film-serie/components/film/film.component';
import { ListFilmComponent } from './film-serie/components/list-film/list-film.component';
import { ListNouveauFilmComponent } from './film-serie/components/list-nouveau-film/list-nouveau-film.component';
import { DetailsFilmComponent } from './film-serie/components/details-film/details-film.component';
import { TimePipe } from './film-serie/pipes/time.pipe';
import { MaterialAngularModule } from './material-modules/material.module';
import { ListSerieComponent } from './film-serie/components/list-serie/list-serie.component';
import { DetailsSerieComponent } from './film-serie/components/details-serie/details-serie.component';
import { SerieComponent } from './film-serie/components/serie/serie.component';
import { StringPipe } from './film-serie/pipes/string.pipe';
import { GenreComponent } from './film-serie/components/genre/genre.component';
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
