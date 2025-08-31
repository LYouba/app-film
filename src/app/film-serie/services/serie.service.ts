import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ResponseSerieDetail,
  ResponseSeries,
  ResponseSeriesSearch,
  SerieSearch,
} from '../models/serie.model';
import { ResponseGenres } from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  constructor(private http: HttpClient) {}

  getDetailsSerieByID(id: number): Observable<ResponseSerieDetail> {
    const url = `https://api.betaseries.com/shows/display?v=3.0&key=c7b20f1bff04&id=${id}`;
    return this.http.get<ResponseSerieDetail>(url, { observe: 'body' });
  }

  getSeries(limit: number): Observable<ResponseSeries> {
    const url = `https://api.betaseries.com/shows/list?v=3.0&key=c7b20f1bff04&limit=${limit}`;
    return this.http.get<ResponseSeries>(url, { observe: 'body' });
  }

  getSeriesByFiltres(
genre: string = '', searchWord: string = '', limit: number  ): Observable<ResponseSeriesSearch> {
    const url = `https://api.betaseries.com/search/shows?v=3.0&key=c7b20f1bff04&genres=${genre}&text=${searchWord}&limit=${limit}`;
    return this.http.get<ResponseSeriesSearch>(url, { observe: 'body' }).pipe(
      map((response) => {
        const series = response.shows.map((serieSearch) =>
          SerieSearch.getInstenceSerieSearch(serieSearch)
        );
        return new ResponseSeriesSearch(
          series,
          response.total,
          response.locale,
          response.errors
        );
      })
    );
  }

  getGenresSeries(): Observable<ResponseGenres> {
    const url = `https://api.betaseries.com/shows/genres?v=3.0&key=c7b20f1bff04`;
    return this.http.get<ResponseGenres>(url, { observe: 'body' }).pipe(
      map((data) => {
        return new ResponseGenres(data.genres, data.locale, data.errors);
      })
    );
  }
}
