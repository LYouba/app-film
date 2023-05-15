import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { FilmService } from 'src/app/film-serie/services/film.service';

@Component({
  selector: 'app-details-film',
  templateUrl: './details-film.component.html',
  styleUrls: ['./details-film.component.css']
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
      next: (value) => {
        this.film$ = this.filmService.getDetailsFilmByID(value['id']).pipe(
          map(data => { console.log(data.movie);
            return { detailsFilm: data.movie } }),
          catchError(error => of(error))
        );
      },
      error: (err) => {
        console.log('errer parametre details film');
        // throw new Error(`erreur parametre id details film `);
      },
    })
    this.film$.subscribe(x=> console.log(x))
  }
}
