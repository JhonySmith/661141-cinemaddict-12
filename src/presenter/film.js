import FilmView from "../view/film.js";
import FilmDetailsView from "../view/film-details.js";

import {render, remove, replace, RenderPosition} from "../utils.js";

export default class FilmPresenter {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._createFilmDetails = this._createFilmDetails.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
    this._handleAddToFavoriteListClick = this._handleAddToFavoriteListClick.bind(this);
    this._film = null;
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmView(film);

    this._filmCardComponent.setPosterClickHandler(this._openFilmDetails);
    this._filmCardComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmCardComponent.setAddToFavoriteListClickHandler(this._handleAddToFavoriteListClick);

    if (prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    const pageBody = document.querySelector(`body`);

    if (pageBody.contains(prevFilmDetailsComponent.getElement())) {
      this._createFilmDetails();
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
      remove(prevFilmDetailsComponent);
    }
  }

  _createFilmDetails() {
    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmDetails);
    this._filmDetailsComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmDetailsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmDetailsComponent.setAddToFavoriteListClickHandler(this._handleAddToFavoriteListClick);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _openFilmDetails() {
    this._createFilmDetails();
    const pageBody = document.querySelector(`body`);
    render(pageBody, this._filmDetailsComponent, RenderPosition.BEFOREEND);
  }

  _onEscKeyDown(evt) {
    const isEscPress = (evt.key === `Ecs`) || (evt.key === `Escape`);
    if (isEscPress) {
      this._closeFilmDetails();
    }
  }

  _closeFilmDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleAddToWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchList: !this._film.inWatchList
            }
        )
    );
  }

  _handleMarkAsWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              viewed: !this._film.viewed
            }
        )
    );
  }

  _handleAddToFavoriteListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inFavoriteList: !this._film.inFavoriteList
            }
        )
    );
  }
}
