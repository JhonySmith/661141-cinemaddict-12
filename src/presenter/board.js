
import NavigationView from "../view/navigation.js";
import SortingView from "../view/sorting.js";
import FilmView from "../view/film.js";
import AllFilmsListView from "../view/all-films-list";
import FilmsBoardView from "../view/films-board.js";
import FilmsContainerView from "../view/films-container.js";
import TopRatedFilmsView from "../view/top-rated-films.js";
import MostCommentedFilmsView from "../view/most-commented-films.js";
import ShowMoreButtonView from "../view/show-more-button.js";

import {render, remove, RenderPosition} from "../utils.js";

import {SUB_FILMS_COUNT, FILMS_NUMBER_STEP} from "../common/constants.js";

export default class Board {
  constructor(boardContainer) {
    this._container = boardContainer;

    this._navigationComponent = new NavigationView();
    this._sortingComponent = new SortingView();
    this._filmsBoardComponent = new FilmsBoardView();

    this._allFilmsComponent = new AllFilmsListView();
    this._allFilmsContainerComponent = new FilmsContainerView();

    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topRatedFilmsContainerComponent = new FilmsContainerView();

    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._mostCommentedFilmsContainerComponent = new FilmsContainerView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._prevFilmsCount = 0;
    this._showFilmsCount = 5;

    this._films = null;
  }

  init(films) {
    this._films = films;
    this._renderFilmsBoard();

    if (films.length) {
      this._renderFilms(films);
    } else {
      this._renderNoFilms();
    }
  }

  _renderFilms(films) {
    render(this._filmsBoardComponent, this._allFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    this._renderAllFilms(films);
    if (this._showFilmsCount < this._films.length) {
      this._renderShowMoreButton();
    }
    this._renderTopRatedFilms(films);
    this._renderMostCommentedFilms(films);
  }

  _renderAllFilms() {
    this._films.slice(this._prevFilmsCount, this._showFilmsCount)
      .forEach((film) => this._renderFilmCard(film, this._allFilmsContainerComponent));
    render(this._allFilmsComponent, this._allFilmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedFilms(films) {
    films.slice().sort((a, b) => b.rating - a.rating)
      .slice(0, SUB_FILMS_COUNT)
        .forEach((film) => this._renderFilmCard(film, this._topRatedFilmsContainerComponent));
    render(this._topRatedFilmsComponent, this._topRatedFilmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilms(films) {
    films.slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, SUB_FILMS_COUNT)
        .forEach((film) => this._renderFilmCard(film, this._mostCommentedFilmsContainerComponent));
    render(this._mostCommentedFilmsComponent, this._mostCommentedFilmsContainerComponent, RenderPosition.BEFOREEND);
  }


  _renderFilmCard(film, container) {
    const filmCardComponent = new FilmView(film).getElement();
    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._allFilmsComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevFilmsCount = this._showFilmsCount;
      this._showFilmsCount = this._showFilmsCount + FILMS_NUMBER_STEP;

      this._renderAllFilms();

      if (this._showFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmsBoard() {
    render(this._container, this._navigationComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoardComponent, RenderPosition.BEFOREEND);
  }
}

