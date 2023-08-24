import { Component, Input } from '@angular/core';
import { serie } from 'src/app/module-film-serie/models/serie.model';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent {
  @Input() singlSerie!: serie;
}
