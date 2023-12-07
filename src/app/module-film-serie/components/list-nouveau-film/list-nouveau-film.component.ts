import { Component } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { film } from 'src/app/module-film-serie/models/film.model';
import { FilmService } from 'src/app/module-film-serie/services/film.service';

@Component({
  selector: 'app-list-nouveau-film',
  templateUrl: './list-nouveau-film.component.html',
  styleUrls: ['./list-nouveau-film.component.css'],
})
export class ListNouveauFilmComponent {
  public newFilms$!: Observable<any>;

  constructor(private serviceFilm: FilmService) {}

  ngOnInit(): void {
    this.getNewFilms();
  }

  getNewFilms() {
    this.newFilms$ = this.serviceFilm.getMoviesUpComing().pipe(
      map((data) => {
        return { films: data.movies };
      }),
      catchError((error) => of(error))
    );
  }

  getFilmByGenres(genre_film: string) {
    this.newFilms$ = this.serviceFilm.getMoviesUpComing().pipe(
      map((data) => {
        let arrayFilms: film[] = [];
        data.movies.forEach((movie) => {
          this.serviceFilm
            .getDetailsFilmByID(+movie.id)
            .pipe(
              map((data) => data.movie['genres']),
              catchError((error) => of(error))
            )
            .subscribe((genre) => {
              if (genre.includes(genre_film)) {
                arrayFilms.push({
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
        return { films: arrayFilms };
      }),
      catchError((error) => of(error))
    );
    // this.newFilms$.subscribe(x => console.log(x))
  }
}
