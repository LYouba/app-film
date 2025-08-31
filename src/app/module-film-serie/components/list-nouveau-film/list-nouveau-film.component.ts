import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Observer,
  Subject,
  catchError,
  forkJoin,
  map,
  merge,
  of,
  takeUntil,
} from 'rxjs';
import {
  Errors,
  Movie,
  ResponseMovies,
} from 'src/app/module-film-serie/models/film.model';
import { FilmService } from 'src/app/module-film-serie/services/film.service';
import { TypeGenre } from '../../models/genre.model';
import { ListComponent } from '../../shared/list/list.component';
import { GenreComponent } from '../genre/genre.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
    selector: 'app-list-nouveau-film',
    templateUrl: './list-nouveau-film.component.html',
    styleUrls: ['./list-nouveau-film.component.css'],
    standalone: true,
    imports: [CardComponent, GenreComponent, ListComponent]
})
export class ListNouveauFilmComponent {
  private static LIMIT_NB_FILM: number = 50;
  private static ADD_TO_LIMIT: number = 25;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  private limitMovie: number = ListNouveauFilmComponent.LIMIT_NB_FILM;

  private subscription: Subject<boolean> = new Subject();

  private saveNewFilms!: Movie[];
  private fetchMovieOnScroll: boolean = true;
  private saveWhenNoFetchDataByGenre: boolean = true;
  private genreSearch: string | null = null;

  TypeGenre = TypeGenre;
  newFilms: Movie[] = [];
  httpError!: Errors;
  loding!: boolean;

  constructor(private serviceFilm: FilmService) {
    // this.router.onSameUrlNavigation ='reload';
  }

  ngOnInit(): void {
    this.loding = true;

    /**
     * cherhcer les films sur API REST
     */
    this.getNewFilms();
  }

  ngAfterViewInit() {
    if (this.scrollContainer) {
      (this.scrollContainer.nativeElement as HTMLDivElement).addEventListener(
        'scrollend',
        () => this.onScroll()
      );
    }
  }

  private onScroll() {
    let div = this.scrollContainer.nativeElement as HTMLDivElement;

    if (
      div.scrollTop + div.clientHeight >= div.scrollHeight && !this.loding && this.fetchMovieOnScroll
    ) {
      this.loding = true;
      if (
        this.limitMovie - ListNouveauFilmComponent.ADD_TO_LIMIT === this.newFilms.length
      ) {
        if (this.genreSearch) {
          this.getFilmByFiltres(this.genreSearch);
        } else {
          this.getNewFilms();
        }
      }
    }
  }

  getFilmByGenre(genreFilm: string) {
    this.loding = true;
    this.newFilms = [];
    this.limitMovie = ListNouveauFilmComponent.LIMIT_NB_FILM;
    this.fetchMovieOnScroll = true;
    this.genreSearch = genreFilm;

    if (genreFilm !== '') {
      this.getFilmByFiltres(genreFilm);
    } else {
      this.getNewFilms();
    }
  }

  /**
   * Gets films "peut etre supprimer et deplacer la logique
   * dans le service films directement"
   */
  private getNewFilms() {
    this.saveWhenNoFetchDataByGenre = true;
    this.serviceFilm
      .getMoviesUpComing(this.limitMovie)
      .pipe(takeUntil(this.subscription))
      .subscribe(this.movieObserver);
  }

  getFilmByFiltres(genreFilm: string = '') {
    this.saveWhenNoFetchDataByGenre = false;
    forkJoin(
      this.saveNewFilms.map((movie: Movie) => {
        return this.serviceFilm.getDetailsFilmByID(+movie.id).pipe(
          map((responseMovieDetails) => {
            if (responseMovieDetails.movie.genres.includes(genreFilm))
              return movie;
            else return null;
          })
        );
      })
    )
      .pipe(
        map((v) => {
          return new ResponseMovies(v.filter((v): v is Movie => v !== null));
        })
      )
      .subscribe(this.movieObserver);
  }

  private movieObserver: Partial<Observer<ResponseMovies>> = {
    next: (resp: ResponseMovies) => {
      this.loding = false;

      resp.movies.forEach((movie) => {
        if (!this.newFilms.some((moviex) => movie.id === moviex.id)) {
          this.newFilms.push(Movie.getInstenceMovie(movie));
        }
      });

      if (this.limitMovie === this.newFilms.length) {
        this.limitMovie =
          this.limitMovie + ListNouveauFilmComponent.ADD_TO_LIMIT;
      } else {
        this.fetchMovieOnScroll = false;
      }

      if (this.saveWhenNoFetchDataByGenre) {
        this.saveNewFilms = [...this.newFilms];
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
