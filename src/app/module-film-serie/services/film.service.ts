import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  MovieSearch,
  ResponseGenres,
  ResponseMovieDetails,
  ResponseMovies,
  ResponseMoviesSearch,
} from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {

  private baseUrl: string = 'https://api.betaseries.com';

  constructor(private http: HttpClient) {}

  getMoviesUpComing(limit: number): Observable<ResponseMovies> {
    const url = `${this.baseUrl}/movies/upcoming?v=3.0&key=c7b20f1bff04&limit=${limit}`;
    return this.http.get<ResponseMovies>(url, { observe: 'body' });
  }

  getFilms(limit: number): Observable<ResponseMovies> {
    const url = `${this.baseUrl}/movies/list?v=3.0&key=c7b20f1bff04&limit=${limit}`;
    return this.http.get<ResponseMovies>(url, {
      observe: 'body',
    });
  }

  getFilmsByFiltres(
    genre: string = '',
    searchWord: string = '',
    limitMovieSearch: number
  ): Observable<ResponseMoviesSearch> {
    const url = `${this.baseUrl}/search/movies?v=3.0&key=c7b20f1bff04&genres=${genre}&text=${searchWord}&limit=${limitMovieSearch}`;
    return this.http
      .get<ResponseMoviesSearch>(url, {
        observe: 'body',
      })
      .pipe(
        map((response) => {
          const movies = response.movies.map((movieSearch) =>
            MovieSearch.getInstenceMovieSearch(movieSearch)
          );
          return new ResponseMoviesSearch(
            movies,
            response.total,
            response.locale,
            response.errors
          );
        })
      );
  }

  getDetailsFilmByID(id: number): Observable<ResponseMovieDetails> {
    const url = `${this.baseUrl}/movies/movie?v=3.0&key=c7b20f1bff04&id=${id}`;
    return this.http.get<ResponseMovieDetails>(url, {
      observe: 'body',
    });
  }

  getGenresFilms(): Observable<ResponseGenres> {
    const url = `${this.baseUrl}/movies/genres?v=3.0&key=c7b20f1bff04`;
    return this.http
      .get<ResponseGenres>(url, {
        observe: 'body',
      })
      .pipe(
        map((data) => {
          return new ResponseGenres(data.genres, data.locale, data.errors);
        })
      );
  }
}
