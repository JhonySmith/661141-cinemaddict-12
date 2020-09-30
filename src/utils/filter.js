import {Filters} from "../common/constants.js";

export const getFilmsInWatchList = (films) => {
  return films.filter((film) => film.inWatchList);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.viewed);
};

export const getFavouriteFilms = (films) => {
  return films.filter((film) => film.inFavoriteList);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case Filters.WATCHLIST:
      return getFilmsInWatchList(films);
    case Filters.HISTORY:
      return getWatchedFilms(films);
    case Filters.FAVORITES:
      return getFavouriteFilms(films);
    default:
      return films;
  }
};


