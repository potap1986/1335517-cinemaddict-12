export const FILMS_NUM = 20;

export const FILMS_COUNT = 5;

export const EXTRA_FILMS_COUNT = 2;

export const BAR_HEIGHT = 50;

export const Time = {
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
};

export const StatisticPeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const Month = {
  1: `January`,
  2: `February`,
  3: `March`,
  4: `April`,
  5: `May`,
  6: `June`,
  7: `July`,
  8: `August`,
  9: `September`,
  10: `October`,
  11: `November`,
  12: `December`,
};

export const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`
};

export const FilterId = {
  all: `All movies`,
  inWatchlist: `Watchlist`,
  isWatched: `History`,
  isFavorite: `Favorites`,
};

export const FilmsExtraTitleId = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  FILTERS: `FILTERS`
};

export const activeId = {
  id: 0,
};
