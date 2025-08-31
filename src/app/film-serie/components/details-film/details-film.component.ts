import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { FilmService } from 'src/app/film-serie/services/film.service';
import { TimePipe } from 'src/app/shared/pipes/time.pipe';
import { NgIf, NgFor, AsyncPipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-details-film',
    templateUrl: './details-film.component.html',
    styleUrls: ['./details-film.component.css'],
    imports: [NgIf, NgFor, AsyncPipe, KeyValuePipe, TimePipe]
})
export class DetailsFilmComponent {
  film$!: Observable<any>;

  constructor(private route: ActivatedRoute, private filmService: FilmService) { }
  ngOnInit() {
    this.getDetailsFilm();
  }

  // console.log(this.route.snapshot.params); // methode statique s'il y a un changement de route sans recharger le paramètre ne va pas fonctionner
  getDetailsFilm() {
    this.route.params.subscribe({
      next: (params) => {
        this.film$ = this.filmService.getDetailsFilmByID(params['id']).pipe(
          map(data => {
            // console.log(data.movie);
            return { detailsFilm: data.movie } }),
          catchError(error => of(error))
        );
      },
      error: (err) => {
        // throw new Error(`erreur parametre id details film `);
      },
    })
    // this.film$.subscribe(x=> console.log(x))
  }
}
