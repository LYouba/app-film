import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Observer,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  Errors,
  Movie,
  ResponseMovies,
} from 'src/app/module-film-serie/models/film.model';
import { FilmService } from 'src/app/module-film-serie/services/film.service';
import { SearchService } from 'src/app/module-film-serie/services/search.service';
import { TypeGenre } from '../../models/genre.model';
import { AbstractListElement } from '../AbstractListElement';
import { ListComponent } from '../../shared/list/list.component';
import { GenreComponent } from '../genre/genre.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
    selector: 'app-list-film',
    templateUrl: './list-film.component.html',
    styleUrls: ['./list-film.component.css'],
    standalone: true,
    imports: [CardComponent, GenreComponent, ListComponent]
})
export class ListFilmComponent extends AbstractListElement{

  private fetchMovie: boolean = true;

  private subscription: Subject<boolean> = new Subject();

  TypeGenre = TypeGenre;
  films: Movie[] = [];
  httpError!: Errors;
  loding!: boolean;
  textSearch: string = '';
  genreSearch: string = '';

  constructor(
    private serviceFilm: FilmService,
    private searchService: SearchService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loding = true;

    /**
     * cherhcer les films sur API REST
     */
    this.getFilms();

    /**
     * souscrire à l'observable searchReponse$
     * url de la route n'a pas changé
     */
    this.searchService.searchTermReadOnly$
      .pipe(
        takeUntil(this.subscription),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((searchWord) => {
          this.loding = true;
          this.films = [];
          this.limitMovie = ListFilmComponent.LIMIT_NB_FILM;
          this.fetchMovie = true;
          this.genreSearch = '';
          this.textSearch = searchWord;
          if (searchWord !== '') {
            this.getFilmByFiltres('', searchWord);
          } else {
            this.getFilms();
          }
          return of();
        })
      )
      .subscribe();
  }

  onScroll = () => {
    let div = this.scrollContainer.nativeElement as HTMLDivElement;

    if (
      div.scrollTop + div.clientHeight >= div.scrollHeight - 20 &&
      !this.loding &&
      this.fetchMovie
    ) {
      this.loding = true;

      if (
        this.limitMovie - ListFilmComponent.ADD_TO_LIMIT ===
        this.films.length
      )
        if (this.textSearch !== '') {
          this.getFilmByFiltres('', this.textSearch);
        } else if (this.genreSearch !== '') {
          this.getFilmByFiltres(this.genreSearch, '');
        } else {
          this.getFilms();
        }
    }
  }

  getFilmByGenre(genreFilm: string) {
    this.loding = true;
    this.films = [];
    this.limitMovie = ListFilmComponent.LIMIT_NB_FILM;
    this.fetchMovie = true;
    this.textSearch = '';
    this.genreSearch = genreFilm;
    if (genreFilm !== "") {
      this.getFilmByFiltres(genreFilm, '');
    }else{
      this.getFilms()
    }
  }

  /**
   * Gets films "peut etre supprimer et deplacer la logique
   * dans le service films directement"
   */
  private getFilms() {
    this.serviceFilm
      .getFilms(this.limitMovie)
      .pipe(takeUntil(this.subscription))
      .subscribe(this.movieObserver);
  }

  getFilmByFiltres(genreFilm: string = '', search: string = '') {
    this.serviceFilm
      .getFilmsByFiltres(genreFilm, search, this.limitMovie)
      .pipe(
        takeUntil(this.subscription),
        map((data) => {
          let arrayFilms: Movie[] = [];
          data.movies.forEach((movieSearch) => {
            arrayFilms.push(movieSearch.getMovie());
          });
          return new ResponseMovies(arrayFilms);
        })
      )
      .subscribe(this.movieObserver);
  }

  private movieObserver: Partial<Observer<ResponseMovies>> = {
    next: (resp: ResponseMovies) => {
      if (this.textSearch !== '') {
        this.films = [];
      }
      this.loding = false;

      resp.movies.forEach((movie) => {
        if (!this.films.some((moviex) => movie.id === moviex.id)) {
          this.films.push(Movie.getInstenceMovie(movie));
        }
      });
      if (this.limitMovie === this.films.length) {
        this.limitMovie = this.limitMovie + ListFilmComponent.ADD_TO_LIMIT;
      } else {
        this.fetchMovie = false;
      }
    },
    error: (err) => {
      this.loding = false;
      if (err instanceof HttpErrorResponse) {
        if (err.status === HttpStatusCode.NotFound || err.status === 0) {
          this.httpError = new Errors(err.status, err.error);
        } else {
          const errors = err.error.errors as Errors[];
          this.httpError = new Errors(errors[0].code, errors[0].text);
        }
      } else {
        this.httpError = new Errors(999, 'Erreur Inconnue');
      }
    },
  };

  filmTrackBy(index: number, film: Movie) {
    return film.id;
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.complete();
    this.subscription.unsubscribe();
  }
}
