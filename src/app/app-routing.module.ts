import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNouveauFilmComponent } from './module-film-serie/components/list-nouveau-film/list-nouveau-film.component';
import { DetailsFilmComponent } from './module-film-serie/components/details-film/details-film.component';
import { ListFilmComponent } from './module-film-serie/components/list-film/list-film.component';
import { ListSerieComponent } from './module-film-serie/components/list-serie/list-serie.component';
import { DetailsSerieComponent } from './module-film-serie/components/details-serie/details-serie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'login/:login', component: LoginComponent, pathMatch:'full'
  },
  {
    path: 'films', canActivateChild: [AuthGuard], children: [
      { path: 'nouveaux-film', component: ListNouveauFilmComponent },
      { path: 'all-movie', component: ListFilmComponent },
      { path: ':id', component: DetailsFilmComponent },
      { path: '', redirectTo: 'nouveaux-film', pathMatch: 'full' },
    ]
  },
  {
    path: 'series', canActivateChild: [AuthGuard], children: [
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
