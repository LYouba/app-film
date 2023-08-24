import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new Subject<string>(); // permet de construire un flux de connées

  /**créer un obseravable à la base du sujet, il
    est juste possible de lire les données */
  searchTermReadOnly$ = this.searchTerms.asObservable();

  constructor() { }

  /**
   * methode pour permettre à l'observable
   * d'emettre une valeur passé comme param
   * @param term
   */
  setSearch(term: string): void {
    this.searchTerms.next(term)
  }
}
