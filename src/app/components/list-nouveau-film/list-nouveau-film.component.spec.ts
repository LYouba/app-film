import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNouveauFilmComponent } from './list-nouveau-film.component';

describe('ListNouveauFilmComponent', () => {
  let component: ListNouveauFilmComponent;
  let fixture: ComponentFixture<ListNouveauFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNouveauFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNouveauFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
