import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subject, catchError, delay, map, of, takeUntil, tap } from 'rxjs';
import { Film } from 'src/app/module-film-serie/models/film.model';
import { FilmService } from 'src/app/module-film-serie/services/film.service';

@Component({
  selector: 'app-list-nouveau-film',
  templateUrl: './list-nouveau-film.component.html',
  styleUrls: ['./list-nouveau-film.component.css'],
})
export class ListNouveauFilmComponent {
  
  private ngUnsubscribe = new Subject<void>();
  
  public newFilms: {movies: Film[], errors: []}| undefined = this.serviceFilm.films;
  public errorLoding: any;

  constructor(private serviceFilm: FilmService) {}

  ngOnInit(): void {
    this.serviceFilm.newFilms$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (value) => {        
        this.newFilms = value;
      },
      error: (err) => {
        this.errorLoding = err;
        this.newFilms = {movies: [],errors: []};
      },
    });

    if (!this.newFilms) this.getNewFilms();
  }

  getNewFilms() {
    this.serviceFilm.getMoviesUpComing();
  }

  getFilmByGenres(genre_film: string) {
    this.newFilms = undefined;
    this.serviceFilm.films.movies.forEach((movie: Film) => {
      this.serviceFilm
        .getDetailsFilmByID(+movie.id)
        .pipe(
          map((data) => data.movie['genres']),
          catchError((error) => of(error))
        )
        .subscribe((genre) => {
          if (genre.includes(genre_film)) {
            if (!this.newFilms) {
              this.newFilms = {movies:[], errors:[]}
            }
            this.newFilms.movies.push({
              id: movie.id,
              title: movie.title,
              production_year: movie.production_year,
              poster: movie.poster,
              imdb_id: movie.tmdb_id,
              followers: movie.followers,
              tmdb_id: movie.tmdb_id,
            });
          }
        });
    });
  }

  /**
   * se désabonner de tous les observables et les eventListener
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
