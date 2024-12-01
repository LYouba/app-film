import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsFilmComponent } from './components/details-film/details-film.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { GenreComponent } from './components/genre/genre.component';
import { ListFilmComponent } from './components/list-film/list-film.component';
import { ListNouveauFilmComponent } from './components/list-nouveau-film/list-nouveau-film.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';

import { AppRoutingModule } from '../app-routing.module';
import { TimePipe } from './pipes/time.pipe';
import { SubStringPipe } from './pipes/sub-string.pipe';
import { CardComponent } from './shared/card/card.component';
import { ListComponent } from './shared/list/list.component';

@NgModule({
  declarations: [
    ListFilmComponent,
    ListNouveauFilmComponent,
    DetailsFilmComponent,
    ListSerieComponent,
    DetailsSerieComponent,
    GenreComponent,
    TimePipe,
    SubStringPipe,
    CardComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class FilmSerieModule { }
