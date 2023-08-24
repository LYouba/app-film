import { Component, Input } from '@angular/core';
import { film } from 'src/app/module-film-serie/models/film.model';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  @Input() singlFilm!: film;
}
