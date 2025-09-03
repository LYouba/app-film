import { CardInterface, Card } from "src/app/shared/models/card.model";

export class Errors {
  constructor(public code: number, public text: string) {}
  // [key: string]: string | number;
}

export class ResponseMovies {
  constructor(public movies: Movie[], public errors?: Errors[]) {}
}

// export class ResponseNewMovies {
// }
// //   constructor(public news: NewMovie[], public errors?: Errors[]) {}

export class ResponseMovieDetails {
  constructor(public movie: MovieDetails, public errors: Errors[]) {}
}

export class ResponseMoviesSearch {
  constructor(
    public movies: MovieSearch[],
    public total: number,
    public locale: string,
    public errors: Errors[]
  ) {}
}

export class ResponseGenres {
  constructor(
    readonly genres: Genre,
    readonly locale: string,
    readonly errors: Errors[]
  ) {}

  getGenreArray(): string[] {
    return Object.keys(this.genres);
  }
}

export class Movie implements CardInterface {
  constructor(
    public id: number,
    public title: string,
    public production_year: number,
    public poster: string
  ) {}

  static getInstenceMovie(movie: Movie): Movie {
    return new Movie(
      movie.id,
      movie.title,
      movie.production_year,
      movie.poster
    );
  }

  toCard(): Card {
    return new Card(this.id, this.title, this.production_year, this.poster, `/films/${this.id}`);
  }
}

// export class NewMovie {
//   constructor(
//     public id: number,
//     public title: string,
//     public date: number,
//     public picture_url: string
//   ) {}

//   static toMovie(newMovie: NewMovie): Movie {
//     return new Movie(
//       newMovie.id,
//       newMovie.title,
//       Number.parseInt(newMovie.date.toString().padStart(4)),
//       newMovie.picture_url
//     );
//   }
// }

export type MovieDetails = {
  id: number;
  title: string;
  original_title: string;
  tmdb_id: number;
  imdb_id: string;
  url: string;
  poster: string;
  backdrop: string;
  production_year: number;
  release_date: string;
  original_release_date: string;
  sale_date: string;
  director: string;
  length: number;
  genres: string[];
  synopsis: string;
  tagline: string;
  language: string;
  notes: {
    mean: number;
    total: number;
    user: number;
  };
  followers: number;
  comments: number;
  similars: number;
  characters: number;
  crew: {
    producers: CrewMember[];
    writers: CrewMember[];
    directors: CrewMember[];
  };
  user: {
    in_account: boolean;
    status: number;
    date: string | null;
    mail: boolean;
    twitter: boolean;
    profile: boolean;
    tags: string;
    favorited: boolean;
    friends_watched: string[];
    friends_want_to_watch: string[];
  };
  trailer: string | null;
  resource_url: string;
  platform_links: string[];
  platforms_svod: string[];
  releasesSvod: string[];
  other_title: string | null;
};

export type CrewMember = {
  id: string;
  name: string;
  slug: string;
  picture: string | null;
};

export class MovieSearch {
  constructor(
    public id: number,
    public slug: string,
    public release_date: number,
    public poster: string,
    public svods: Svod[],
    public alias_title: string | null,
    public title: string
  ) {}

  static getInstenceMovieSearch(movieSearch: MovieSearch): MovieSearch {
    return new MovieSearch(
      movieSearch.id,
      movieSearch.slug,
      movieSearch.release_date,
      movieSearch.poster,
      movieSearch.svods,
      movieSearch.alias_title,
      movieSearch.title
    );
  }

  public getMovie(): Movie {
    const movie = new Movie(
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
  logo: string;
};

export type Genre = {
  [key: string]: string;
};
