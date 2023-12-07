import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { FilmService } from 'src/app/module-film-serie/services/film.service';
import { SerieService } from 'src/app/module-film-serie/services/serie.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  genre$: Observable<any> = of(0);
  @Input() genre_type!: string;
  @Output() clickGenre = new EventEmitter<string>();

  constructor(
    private serviceFilm: FilmService,
    private serviceSerie: SerieService
  ) {}

  ngOnInit() {
    if (this.genre_type === 'film') {
      this.getGenresFilms();
    } else {
      this.getGenresSeries();
    }
  }

  getGenresFilms() {
    this.genre$ = this.serviceFilm.getGenresFilms().pipe(
      // transformer en un tableau pour simplifier la lecture dans la templetre
      //(avant c'était un onjet et il y a eu des soucis de conversion)
      map((data) => {
        return { genres: Object.entries(data.genres) };
      }),

      catchError((error) => of(error))
    );
    // this.genre$.subscribe(x => console.log(x.genres))
  }

  getGenresSeries() {
    this.genre$ = this.serviceSerie.getGenresSeries().pipe(
      map((data) => {
        return { genres: Object.entries(data.genres) };
      }),
      catchError((error) => of(error))
    );
    // this.genre$.subscribe(x => console.log(x.genres))
  }

  onClick(genre: string) {
    this.clickGenre.emit(genre);
  }
}
