import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serie } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private http: HttpClient) { }

  getDetailsSerieByID(id: number): Observable<{ show: any, errors: any }> {
    const url = `https://api.betaseries.com/shows/display?v=3.0&key=c7b20f1bff04&id=${id}`;
    return this.http.get<{ show: any, errors: any }>(url, { observe: 'body' });
  }

  getSeries(): Observable<{ shows: serie[], errors: [] }> {
    const url = `https://api.betaseries.com/shows/list?v=3.0&key=c7b20f1bff04&limit=100`;
    return this.http.get<{ shows: serie[], errors: [] }>(url, { observe: 'body' });
  }

  getSeriesByFiltres(genre: string = '', searchWord: string = ''): Observable<{ shows: [{ [key: string]: string; }], errors: [] }> {
    const url = `https://api.betaseries.com/search/shows?v=3.0&key=c7b20f1bff04&genres=${genre}&text=${searchWord}`;
    return this.http.get<{ shows: [{ [key: string]: string; }], errors: [] }>(url, { observe: 'body' });
  }

  getGenresSeries(): Observable<{ genres: {}, errors: [] }> {
    const url = `https://api.betaseries.com/shows/genres?v=3.0&key=c7b20f1bff04`;
    return this.http.get<{ genres: {}, errors: [] }>(url, { observe: 'body' });
  }
}
