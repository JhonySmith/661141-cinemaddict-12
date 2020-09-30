import AbstractView from "./abstract.js";

const createMainNavigationTemplate = (films) => {
  const watchlistCount = films.slice().filter((film) => film.inWatchList === true).length;
  const historyListCont = films.slice().filter((film) => film.viewed === true).length;
  const favoritesListCount = films.slice().filter((film) => film.inFavoriteList === true).length;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyListCont}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesListCount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._films);
  }
}
