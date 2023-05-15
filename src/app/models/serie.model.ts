export class serie {
  id!: string;
  title!: string;
  followers!: string;
  creation!: string;
  images!: {
    banner?: string;
    box?: string;
    poster: string;
    show?: string;
  };
  description!: string;
  seasons!: string;
  episodes!: string;
  genres!: object;
  length!: string;
  status!: string;
  country!: string;
  language!: string;
}
