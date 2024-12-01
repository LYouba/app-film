import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { Errors } from '../../models/film.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent<T> implements OnChanges {
  
  firstRunder: boolean = true;

  @Input() trackBy?: TrackByFunction<T>;

  @Input() items!: T[];
  @Input() httpError!: Errors;
  @Input() loding!: boolean;

  @Input() templateItem!: TemplateRef<any>;
  @Input() templateErreur?: TemplateRef<any>;
  @Input() templateLoding?: TemplateRef<any>;

  private changes!: SimpleChanges;

  ngOnChanges(changes: SimpleChanges): void {
    this.changes = changes;
  }

  ngOnInit() {

    this.firstRunder = false;

    const properties = Object.keys(this.changes);
    if (
      !properties.includes('items') ||
      !properties.includes('loding') ||
      !properties.includes('httpError') ||
      !properties.includes('templateItem')
    ) {
      throw new Error(
        'Les champs suivant sont obligatoirethis : items, loding, httpError, templateItem'
      );
    }
  }
}
