import { Component, Renderer2, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { SearchService } from '../film-serie/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _renderer2: Renderer2, private searchService: SearchService) { }

  /**
   * Searchs header component
   * @param imputSearch
   */
  onSearch(imputSearch: string): void {
    this.searchService.setSearch(imputSearch);
  }

  /**
   * Determines whether click on pour activer ou désactivé le champ de recherhce
   * @param elSearch
   * @param elSible
   */
  onClick(elSearch: HTMLElement, elSible: HTMLElement) {

    if (elSible.getAttribute('href') === "/films/nouveaux-film") {
      elSearch.setAttribute("disabled", "null")
    } else {
      elSearch.removeAttribute("disabled")
    }
    console.log(elSible.getAttribute('href'));
  }

  /* pour le menu avec angular material  */
  // @ViewChild('menu', { static: true }) menu!: MatMenu;
  // changeColor() {
  //   const el = document.getElementById(this.menu.panelId);
  //   console.log(el);
  //   // this._renderer2.setStyle(el, 'border-radius', '20px');

  //   // this._renderer2.addClass(el,'custom-menu')
  // }
}
