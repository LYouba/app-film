import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNouveauFilmComponent } from './components/list-nouveau-film/list-nouveau-film.component';
import { DetailsFilmComponent } from './components/details-film/details-film.component';
import { ListFilmComponent } from './components/list-film/list-film.component';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { DetailsSerieComponent } from './components/details-serie/details-serie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'films', children: [
      { path: 'nouveaux-film', component: ListNouveauFilmComponent },
      { path: 'all-movie', component: ListFilmComponent },
      { path: ':id', component: DetailsFilmComponent },
      { path: '', redirectTo: 'nouveaux-film', pathMatch: 'full' },
    ]
  },
  {
    path: 'series', children: [
      { path: '', component: ListSerieComponent },
      { path: ':id', component: DetailsSerieComponent },
    ]
  },
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true // <-- debugging purposes only
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
