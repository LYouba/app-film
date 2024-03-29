import { Component } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, ignoreElements, map, of, switchMap, tap } from 'rxjs';
import { Film } from 'src/app/module-film-serie/models/film.model';
import { FilmService } from 'src/app/module-film-serie/services/film.service';
import { SearchService } from 'src/app/module-film-serie/services/search.service';

@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.css']
})
export class ListFilmComponent {
  films$!: Observable<any>;
  recherhce!: string;

  constructor(
    private serviceFilm: FilmService,
    private searchService: SearchService
  ) {
    // this.router.onSameUrlNavigation ='reload';
  }

  ngOnInit(): void {

    /**
     * cherhcer les films sur API REST
     */
    this.getFilms();

    /**
     * souscrire à l'observable searchReponse$
     * url de la route n'a pas changé
    */
    this.searchService.searchTermReadOnly$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term !== '') { this.getFilmByFiltres('', term) }
        else { this.getFilms(); }
        return of();
      })
    ).subscribe()
  }


  /**
   * Gets films "peut etre supprimer et deplacer la logique
   * dans le service films directement"
   */
  getFilms() {
    this.films$ = this.serviceFilm.getFilms().pipe(
      map(data => { return { films: data.movies } }),
      catchError(error => of(error)),
    );
    // this.films$.subscribe(x => console.log(x))
  }

  getFilmByFiltres(genre_film: string = '', search: string = '') {
    // console.log(genre);

    this.films$ = this.serviceFilm.getFilmsByFiltres(genre_film, search).pipe(
      map(data => {
        let arrayFilms: Film[] = [];
        data.movies.forEach(value => {
          arrayFilms.push(
            {
              id: value['id'],
              title: value['title'],
              production_year: value['release_date'],
              poster: value['poster'],
            }
          )
        });
        return { films: arrayFilms }
      }),
      catchError(error => of(error)),
    );
    // this.films$.subscribe(x => console.log(x))
  }

  ngOnDestroy() {

  }
}
