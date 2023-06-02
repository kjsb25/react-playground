export type Movie = {
  Poster: string;
  Title: string;
  Year: string;
};

export enum movieActions {
  LIST,
  SEARCH,
}

export type basicSearch = {
  searchString?: string;
};
