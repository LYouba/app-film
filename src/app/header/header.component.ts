import { Component, Renderer2, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { SearchService } from '../module-film-serie/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../login/dialog-login/dialog-login.component';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @ViewChild('menu', { static: false }) menu!: MatMenu;

  constructor(
    private _renderer2: Renderer2,
    private searchService: SearchService,
    public dialogLogin: MatDialog,
    private router: Router
  ) {}

  handlerStyleMatMenu() { // changement su style au click pour la génération du composant menu
    const el = document.getElementById(this.menu.panelId);
    this._renderer2.setStyle(el, 'border-radius', '20px');
    this._renderer2.addClass(el, 'custom-menu'); // style globale !!
  }

  login() {
    this.dialogLogin.open(DialogLoginComponent, {
      data: decodeURI(this.router.routerState.snapshot.url), 
    });
  }

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
  desableOrenableSearch(elSearch: HTMLElement, elSible: HTMLElement) {
    if (elSible.getAttribute('href') === '/nouveaut%C3%A9es') {
      if (elSearch) elSearch.setAttribute('disabled', 'true');
    } else {
      if (elSearch) elSearch.removeAttribute('disabled');
    }
    // console.log(elSible.getAttribute('href'));
  }
}
