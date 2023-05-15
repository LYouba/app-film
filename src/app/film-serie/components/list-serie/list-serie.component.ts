import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { serie } from 'src/app/film-serie/models/serie.model';
import { SearchService } from 'src/app/film-serie/services/search.service';
import { SerieService } from 'src/app/film-serie/services/serie.service';

@Component({
  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.css']
})
export class ListSerieComponent {
  series$!: Observable<any>;

  constructor(private serviceSerie: SerieService, private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.getSeries();

    this.router.events.subscribe(_ => {
      this.getSeries();
    });

    this.searchService.searchTermReadOnly$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchWord) => {
        if (searchWord !== '') { return this.getSeriesByFiltres('', searchWord) }
        else { return this.getSeries(); }
      })
    ).subscribe()
  }

  getSeries() {
    return this.series$ = this.serviceSerie.getSeries().pipe(
      map(data => {
        let series: serie[] = [];
        data.shows.forEach(value => {
          if (value.seasons !== "0" && value.images.poster !== null) {
            let x: serie = {
              id: value.id,
              title: value.title,
              followers: value.followers,
              creation: value.creation,
              images: { poster: value.images.poster },
              description: value.description,
              seasons: value.seasons,
              episodes: value.episodes,
              genres: value.genres,
              length: value.length,
              status: value.status,
              country: value.country,
              language: value.language,
            }
            series.push(x);
          }

        })
        return { series: series }
      }),
      catchError(error => of(error)),
    );

    // this.serie$.subscribe(x => console.log(x.serie))
  }

  getSeriesByFiltres(genre_serie: string = '', search: string = '') {
    return this.series$ = this.serviceSerie.getSeriesByFiltres(genre_serie, search).pipe(
      map(data => {
        let series: serie[] = [];
        data.shows.forEach(value => {
          series.push(
            {
              id: value['id'],
              title: value['title'],
              creation: value['release_date'],
              images: { poster: value['poster'] },
              followers: '',
              description: '',
              seasons: '',
              episodes: '',
              genres: {},
              length: '',
              status: '',
              country: '',
              language: ''
            }
          )
        });
        return { series: series }
      }),
      catchError(error => of(error)),
    );
    // this.films$.subscribe(x => console.log(x))
  }
}

