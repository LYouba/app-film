import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { SearchService } from '../module-film-serie/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../connexion/login/dialog-login/dialog-login.component';
import {
  NavigationEnd,
  Router,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogRegisterComponent } from '../connexion/register/dialog-register/dialog-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private ngUnsubscribe = new Subject<void>();
  @ViewChild('menu', { static: false }) menu!: MatMenu;
  @ViewChild('search', { static: true }) elHtlmInputSearch!: ElementRef<HTMLInputElement>;

  constructor(
    private _renderer2: Renderer2,
    private searchService: SearchService,
    public dialogLogin: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // Activer ou désactivé le champ de recherhce
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event_2) => {
        if (event_2 instanceof NavigationEnd) {
          const nativeElement = this.elHtlmInputSearch.nativeElement;
          if (this.elHtlmInputSearch)
            ((event_2.url !== '/nouveaut%C3%A9es') && (event_2.url !== "/"))? nativeElement.removeAttribute('disabled') : nativeElement.setAttribute('disabled','true');
        }
      });
  }

  handlerStyleMatMenu() {
    // changement su style au click pour la génération du composant menu
    const el = document.getElementById(this.menu.panelId);
    this._renderer2.setStyle(el, 'border-radius', '20px');
    this._renderer2.addClass(el, 'custom-menu'); // style globale !!
  }

  login() {
    this.dialogLogin.open(DialogLoginComponent, {
      data: decodeURI(this.router.routerState.snapshot.url),
    });
  }

  register() {
    this.dialogLogin.open(DialogRegisterComponent, {
      data: decodeURI(this.router.routerState.snapshot.url), width:"50%"
    });
  }

  /**
   * Searchs header component
   * @param imputSearch
   */
  onSearch(imputSearch: string): void {
    this.searchService.setSearch(imputSearch);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
