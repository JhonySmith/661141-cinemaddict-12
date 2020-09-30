import Abstract from "./abstract.js";

const createFilmTemplate = (film) => {
  const title = film.title;
  const rating = film.rating;
  const releaseDate = film.releaseDate;
  const genre = film.genre;
  const poster = film.poster;
  const description = film.description;
  const commentsCount = film.comments.length;
  const inWatchList = film.inWatchList ? `film-card__controls-item--active` : ``;
  const viewed = film.viewed ? `film-card__controls-item--active` : ``;
  const inFavoriteList = film.inFavoriteList ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${commentsCount} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchList}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${viewed}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavoriteList}">Mark as favorite</button>
        </form>
      </article>`
  );
};

export default class Film extends Abstract {
  constructor(film) {
    super();

    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._addToFavoriteListClickHandler = this._addToFavoriteListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();

    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;

    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, this._posterClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();

    this._callback.addToWatchClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._addToWatchListClickHandler);
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();

    this._callback.markAsWatchedClick();
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  _addToFavoriteListClickHandler(evt) {
    evt.preventDefault();

    this._callback.ddToFavoriteListClick();
  }

  setAddToFavoriteListClickHandler(callback) {
    this._callback.ddToFavoriteListClick = callback;

    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._addToFavoriteListClickHandler);
  }
}
