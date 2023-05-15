import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getMoviesUpComing(): Observable<{ movies: film[], errors: [] }> {
    const url = `https://api.betaseries.com/movies/upcoming?v=3.0&key=c7b20f1bff04&limit=100`;
    return this.http.get<{ movies: film[], errors: [] }>(url, { observe: 'body' })
  }

  getFilms(): Observable<{ movies: film[], errors: [] }> {
    const url = `https://api.betaseries.com/movies/list?v=3.0&key=c7b20f1bff04`;
    return this.http.get<{ movies: film[], errors: [] }>(url, { observe: 'body' });
  }

  getFilmsByFiltres(genre: string = '', searchWord: string = ''): Observable<{ movies: [{ [key: string]: string; }], errors: [] }> {
    const url = `https://api.betaseries.com/search/movies?v=3.0&key=c7b20f1bff04&genres=${genre}&text=${searchWord}`;
    return this.http.get<{ movies: [{ [key: string]: string; }], errors: [] }>(url, { observe: 'body' });
  }

  getDetailsFilmByID(id: number): Observable<{ movie: { [key: string]: string; }, errors: any }> {
    const url = `https://api.betaseries.com/movies/movie?v=3.0&key=c7b20f1bff04&id=${id}`;
    return this.http.get<{ movie: { [key: string]: string; }, errors: any }>(url, { observe: 'body' });
  }

  getGenresFilms(): Observable<{ genres: {}, errors: [] }> {
    const url = `https://api.betaseries.com/movies/genres?v=3.0&key=c7b20f1bff04`;
    return this.http.get<{ genres: {}, errors: [] }>(url, { observe: 'body' });
  }
}
