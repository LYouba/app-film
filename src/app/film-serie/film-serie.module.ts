import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsFilmComponent } from './components/details-film/details-film.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { FilmComponent } from './components/film/film.component';
import { GenreComponent } from './components/genre/genre.component';
import { ListFilmComponent } from './components/list-film/list-film.component';
import { ListNouveauFilmComponent } from './components/list-nouveau-film/list-nouveau-film.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { SerieComponent } from './components/serie/serie.component';

import { AppRoutingModule } from '../app-routing.module';
import { StringPipe } from './pipes/string.pipe';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    FilmComponent,
    ListFilmComponent,
    ListNouveauFilmComponent,
    DetailsFilmComponent,
    ListSerieComponent,
    DetailsSerieComponent,
    SerieComponent,
    GenreComponent,
    TimePipe,
    StringPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class FilmSerieModule { }
