import { Card, CardInterface } from '../shared/models/card.model';
import { Errors } from './film.model';

export class ResponseSeries {
  constructor(
    public shows: SerieDetails[],
    public errors?: Errors[],
    public locale?: string
  ) {}
}

export class ResponseSeriesSearch {
  constructor(
    public shows: SerieSearch[],
    public total: number,
    public locale: string,
    public errors: Errors[]
  ) {}
}

export class ResponseSerieDetail {
  constructor(public show: SerieDetails, public errors: Errors[]) {}
}

export class SerieSearch {
  constructor(
    public id: number,
    public following	: number,
    public slug: string,
    public release_date: number,
    public poster: string,
    public svods: Svod[],
    public alias_title: string | null,
    public title: string
  ) {}

  static getInstenceSerieSearch(serieSearch: SerieSearch): SerieSearch {
    return new SerieSearch(
      serieSearch.id,
      serieSearch.following,
      serieSearch.slug,
      serieSearch.release_date,
      serieSearch.poster,
      serieSearch.svods,
      serieSearch.alias_title,
      serieSearch.title
    );
  }

  public getSerie(): Serie {
    const movie = new Serie(
      this.id,
      this.title,
      this.release_date,
      this.poster
    );
    return movie;
  }
}

export type Svod = {
  id: number;
  name: string;
};

export class Serie implements CardInterface {
  constructor(
    public id: number,
    public title: string,
    public creation: number,
    public poster: string
  ) {}

  static serieDetailsToSerie(serie: SerieDetails): Serie {
    return new Serie(
      serie.id,
      serie.title,
      Number.parseInt(serie.creation),
      serie.images.poster
    );
  }

  static serieSearchToSerie(serie: SerieSearch): Serie {
    return new Serie(
      serie.id,
      serie.title,
      serie.release_date,
      serie.poster
    );
  }

  toCard(): Card {
    return new Card(this.id, this.title, this.creation, this.poster);
  }
}

export class SerieDetails {
  id!: number;
  thetvdb_id!: number;
  imdb_id!: string;
  themoviedb_id!: number;
  slug!: string;
  title!: string;
  original_title!: string;
  description!: string;
  seasons!: string;
  seasons_details!: SeasonDetail[];
  episodes!: string;
  followers!: string;
  comments!: number;
  similars!: string;
  characters!: string;
  creation!: string;
  showrunner!: string | null;
  showrunners!: string[];
  genres!: Genres;
  length!: string;
  network!: string;
  country!: string;
  rating!: string;
  status!: string;
  language!: string;
  notes!: Notes;
  in_account!: boolean;
  images!: Images;
  aliases!: Record<string, string>;
  social_links!: SocialLink[];
  user!: User;
  next_trailer!: string | null;
  next_trailer_host!: string | null;
  resource_url!: string;
  platforms!: string | null;
}

export class SeasonDetail {
  number!: number;
  episodes!: number;
}

export class Genres {
  Animation!: string;
  Anime!: string;
  Comedy!: string;
  Mystery!: string;
  Romance!: string;
}

export class Notes {
  total!: number;
  mean!: number;
  user!: number;
}

export class Images {
  show!: string;
  banner!: string;
  box!: string;
  poster!: string;
}

export class SocialLink {
  type!: string;
  external_id!: string;
}

export class User {
  archived!: boolean;
  favorited!: boolean;
  remaining!: number;
  status!: number;
  last!: string;
  tags!: string[] | null;
  next!: NextEpisode;
  friends_watching!: any[];
  rewatch!: Rewatch;
}

export class NextEpisode {
  id!: number | null;
  code!: string;
  date!: string | null;
  title!: string | null;
  image!: string | null;
}

export class Rewatch {
  total!: number;
  agenda!: boolean;
}
