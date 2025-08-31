import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  of,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  Observer,
  takeUntil,
  Subject,
  map,
} from 'rxjs';
import {
  ResponseSeries,
  ResponseSeriesSearch,
  Serie,
  SerieSearch,
} from 'src/app/film-serie/models/serie.model';
import { SearchService } from 'src/app/film-serie/services/search.service';
import { SerieService } from 'src/app/film-serie/services/serie.service';
import { TypeGenre } from '../../models/genre.model';
import { Errors } from '../../models/film.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ListComponent } from 'src/app/shared/list/list.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { GenreComponent } from '../genre/genre.component';

@Component({
    selector: 'app-list-serie',
    templateUrl: './list-serie.component.html',
    styleUrls: ['./list-serie.component.css'],
    imports: [CardComponent, GenreComponent, ListComponent]
})
export class ListSerieComponent {
  static LIMIT_NB_SERIE: number = 50;
  static ADD_TO_LIMIT: number = 25;

  private limitSerie: number = ListSerieComponent.LIMIT_NB_SERIE;
  private fetchSerie: boolean = true;

  private subscription: Subject<boolean> = new Subject();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  TypeGenre = TypeGenre;
  series: Serie[] = [];
  httpError!: Errors;
  loding!: boolean;
  textSearch: string = '';
  genreSearch: string = '';

  constructor(
    private serviceSerie: SerieService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loding = true;

    this.getSeries();

    this.searchService.searchTermReadOnly$
      .pipe(
        takeUntil(this.subscription),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((searchWord) => {
          this.loding = true;
          this.series = [];
          this.limitSerie = ListSerieComponent.LIMIT_NB_SERIE;
          this.fetchSerie = true;
          this.genreSearch = '';
          this.textSearch = searchWord;
          if (searchWord !== '') {
            this.getSeriesByFiltres('', searchWord);
          } else {
            this.getSeries();
          }
          return of();
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    if (this.scrollContainer) {
      (this.scrollContainer.nativeElement as HTMLDivElement).addEventListener(
        'scrollend',
        () => this.onScroll()
      );
    }
  }

  private onScroll() {
    let div = this.scrollContainer.nativeElement as HTMLDivElement;

    if (
      div.scrollTop + div.clientHeight >= div.scrollHeight - 20 &&
      !this.loding &&
      this.fetchSerie
    ) {
      this.loding = true;

      if (
        this.limitSerie - ListSerieComponent.ADD_TO_LIMIT ===
        this.series.length
      ) {
        if (this.textSearch !== '') {
          this.getSeriesByFiltres('', this.textSearch);
        } else if (this.genreSearch !== '') {
          this.getSeriesByFiltres(this.genreSearch, '');
        } else {
          this.getSeries();
        }
      }
    }
  }

  getSerieByGenre(genreSerie: string) {
    this.loding = true;
    this.series = [];
    this.limitSerie = ListSerieComponent.LIMIT_NB_SERIE;
    this.fetchSerie = true;
    this.textSearch = '';
    this.genreSearch = genreSerie;

    if (genreSerie !== "") {
      this.getSeriesByFiltres(genreSerie, '');
    }else{
      this.getSeries()
    }
  }

  getSeries() {
    this.serviceSerie
      .getSeries(this.limitSerie)
      .pipe(takeUntil(this.subscription))
      .subscribe(this.serieDetailsObserver);
  }

  getSeriesByFiltres(genreSerie: string = '', search: string = '') {
    this.serviceSerie
      .getSeriesByFiltres(genreSerie, search, this.limitSerie)
      .pipe(
        takeUntil(this.subscription),
        map((data) => {
          let arraySeries: SerieSearch[] = [];
          data.shows.forEach((serieSearch) => {
            arraySeries.push(SerieSearch.getInstenceSerieSearch(serieSearch));
          });
          return new ResponseSeriesSearch(
            arraySeries,
            data.total,
            data.locale,
            data.errors
          );
        })
      )
      .subscribe(this.serieSearchObserver);
  }

  private serieSearchObserver: Partial<Observer<ResponseSeriesSearch>> = {
    next: (resp: ResponseSeriesSearch) => {
      if (this.textSearch !== '') {
        this.series = [];
      }
      this.loding = false;

      resp.shows.forEach((serieSearch) => {
        if (!this.series.some((serie) => serieSearch.id === serie.id)) {
          this.series.push(Serie.serieSearchToSerie(serieSearch));
        }
      });
      if (this.limitSerie === this.series.length) {
        this.limitSerie = this.limitSerie + ListSerieComponent.ADD_TO_LIMIT;
      } else {
        this.fetchSerie = false;
      }
    },
    error: (err) => this.handlerError(err),
  };

  private serieDetailsObserver: Partial<Observer<ResponseSeries>> = {
    next: (resp: ResponseSeries) => {
      this.loding = false;

      resp.shows.forEach((serieDetails) => {
        if (!this.series.some((serie) => serieDetails.id === serie.id)) {
          this.series.push(Serie.serieDetailsToSerie(serieDetails));
        }
      });

      if (this.limitSerie === this.series.length) {
        this.limitSerie = this.limitSerie + ListSerieComponent.ADD_TO_LIMIT;
      } else {
        this.fetchSerie = false;
      }
    },
    error: (err) => this.handlerError(err),
  };

  private handlerError(err: any) {
    this.loding = false;
    if (err instanceof HttpErrorResponse) {
      if (err.status === 404 || err.status === 0) {
        this.httpError = new Errors(err.status, err.error);
      } else {
        const errors = err.error.errors as Errors[];
        this.httpError = new Errors(errors[0].code, errors[0].text);
      }
    } else {
      this.httpError = new Errors(999, 'Erreur Inconnue');
    }
  }

  serieTrackBy(index: number, film: Serie) {
    return film.id;
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.complete();
    this.subscription.unsubscribe();
  }
}
