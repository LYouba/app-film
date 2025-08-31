import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { FilmService } from 'src/app/module-film-serie/services/film.service';
import { SerieService } from 'src/app/module-film-serie/services/serie.service';
import { ResponseGenres } from '../../models/film.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeGenre } from '../../models/genre.model';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.scss'],
    imports: [NgIf, NgFor, AsyncPipe]
})
export class GenreComponent {
  selectedGenre!: string;
  selectedBtn!: HTMLButtonElement | null;

  genre$: Observable<ResponseGenres | HttpErrorResponse> = of();
  @Input() genreType!: TypeGenre;
  @Output() clickGenre = new EventEmitter<string>();

  constructor(
    private serviceFilm: FilmService,
    private serviceSerie: SerieService
  ) {}

  ngOnInit() {
    if (this.genreType === TypeGenre.film) {
      this.getGenresFilms();
    } else {
      this.getGenresSeries();
    }
  }

  getGenresFilms() {
    this.genre$ = this.serviceFilm
      .getGenresFilms()
      .pipe(catchError((error) => of(error)));
  }

  getGenresSeries() {
    this.genre$ = this.serviceSerie
      .getGenresSeries()
      .pipe(catchError((error) => of(error)));
  }

  onClick(genre: string, btn: HTMLButtonElement) {
    btn.style.backgroundColor = 'green';
    if (this.selectedBtn) {
      this.selectedBtn.style.backgroundColor = '';
    }
    if (this.selectedGenre !== genre) {
      this.clickGenre.emit(genre);
      this.selectedGenre = genre;
      this.selectedBtn = btn;
    }else{
      this.selectedGenre = "";
      this.selectedBtn = null;
      this.clickGenre.emit("");
    }

  }

  isResponseGenres(value: ResponseGenres | HttpErrorResponse): boolean {
    return value instanceof ResponseGenres;
  }

  castResponseGenres(
    value: ResponseGenres | HttpErrorResponse
  ): ResponseGenres {
    if (value instanceof ResponseGenres) {
      return new ResponseGenres(value.genres, value.locale, value.errors);
    } else {
      return new ResponseGenres({}, '', []);
    }
  }

  castHttpErrorResponse(
    value: ResponseGenres | HttpErrorResponse
  ): HttpErrorResponse {
    if (value instanceof HttpErrorResponse) {
      return value;
    } else {
      return new HttpErrorResponse({});
    }
  }
}
