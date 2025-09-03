import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNouveauFilmComponent } from './film-serie/components/list-nouveau-film/list-nouveau-film.component';
import { DetailsFilmComponent } from './film-serie/components/details-film/details-film.component';
import { ListFilmComponent } from './film-serie/components/list-film/list-film.component';
import { ListSerieComponent } from './film-serie/components/list-serie/list-serie.component';
import { DetailsSerieComponent } from './film-serie/components/details-serie/details-serie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './connexion/auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'login/:login', component: DialogLoginComponent, pathMatch:'full'
  // },
  { path: 'nouveautées',title: "nouveautées", children: [
      { path: '', component: ListNouveauFilmComponent },
      { path: ':id', component: DetailsFilmComponent },
    ]
  },
  {
    path: 'films', title: "films", canActivateChild: [AuthGuard], children: [
      { path: '', component: ListFilmComponent },
      { path: ':id', component: DetailsFilmComponent },
    ]
  },
  {
    path: 'series',title: "series",  canActivateChild: [AuthGuard], children: [
      { path: '', component: ListSerieComponent },
      { path: ':id', component: DetailsSerieComponent },
    ]
  },
  { path: '', redirectTo: 'nouveautées', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true // <-- debugging purposes only
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
