import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-details-serie',
  templateUrl: './details-serie.component.html',
  styleUrls: ['./details-serie.component.css']
})
export class DetailsSerieComponent {
  serie$!: Observable<any>;

  constructor(private route: ActivatedRoute, private serviceSerie: SerieService) { }
  ngOnInit() {
    this.getDetailsSerie();
  }

  getDetailsSerie() {
    this.route.params.subscribe({
      next: (value) => {
        console.log(value['id']);

        this.serie$ = this.serviceSerie.getDetailsSerieByID(value['id']).pipe(
          map(data => {
            // console.log(data.show);

            return { detailsSerie: data.show } }),
          catchError(error => of(error))
        );

      },
      error: (err) => {
        console.log('errer parametre details film');
        // throw new Error(`erreur parametre id details film `);
      },
    })
    // this.serie$.subscribe(x=> console.log(x))
  }
}
