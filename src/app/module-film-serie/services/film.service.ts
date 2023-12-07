import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, delay, map, of, timer } from 'rxjs';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private newFilms: Subject<{ movies: Film[]; errors: [] }> = new Subject();
  public newFilms$ = this.newFilms.asObservable();
  public films!: { movies: Film[]; errors: [] };

  constructor(private http: HttpClient) {}

  getMoviesUpComing(): void {
    const url = `https://api.betaseries.com/movies/upcoming?v=3.0&key=c7b20f1bff04&limit=100`;
    this.http
      .get<{ movies: Film[]; errors: [] }>(url, { observe: 'body' })
      .pipe(
        map((data) => {
          this.films = data;
          this.newFilms.next(data);
        }),
        catchError((err,caught) => {this.newFilms.error(err); return of(err)})
      )
      .subscribe();
  }

  getFilms(): Observable<{ movies: Film[]; errors: [] }> {
    const url = `https://api.betaseries.com/movies/list?v=3.0&key=c7b20f1bff04`;
    return this.http.get<{ movies: Film[]; errors: [] }>(url, {
      observe: 'body',
    });
  }

  getFilmsByFiltres(
    genre: string = '',
    searchWord: string = ''
  ): Observable<{ movies: [{ [key: string]: string }]; errors: [] }> {
    const url = `https://api.betaseries.com/search/movies?v=3.0&key=c7b20f1bff04&genres=${genre}&text=${searchWord}`;
    return this.http.get<{ movies: [{ [key: string]: string }]; errors: [] }>(
      url,
      { observe: 'body' }
    );
  }

  getDetailsFilmByID(
    id: number
  ): Observable<{ movie: { [key: string]: string }; errors: any }> {
    const url = `https://api.betaseries.com/movies/movie?v=3.0&key=c7b20f1bff04&id=${id}`;
    return this.http.get<{ movie: { [key: string]: string }; errors: any }>(
      url,
      { observe: 'body' }
    );
  }

  getGenresFilms(): Observable<{ genres: {}; errors: [] }> {
    const url = `https://api.betaseries.com/movies/genres?v=3.0&key=c7b20f1bff04`;
    return this.http.get<{ genres: {}; errors: [] }>(url, { observe: 'body' });
  }
}
