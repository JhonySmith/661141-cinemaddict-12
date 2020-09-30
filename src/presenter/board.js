import FilmPresenter from "./film.js";

import NavigationView from "../view/navigation.js";
import SortingView, {SortType} from "../view/sorting.js";
import AllFilmsListView from "../view/all-films-list";
import FilmsBoardView from "../view/films-board.js";
import FilmsContainerView from "../view/films-container.js";
import TopRatedFilmsView from "../view/top-rated-films.js";
import MostCommentedFilmsView from "../view/most-commented-films.js";
import ShowMoreButtonView from "../view/show-more-button.js";

import {render, remove, RenderPosition, updateItem} from "../utils.js";

import {SUB_FILMS_COUNT, FILMS_NUMBER_STEP} from "../common/constants.js";

export default class Board {
  constructor(boardContainer) {
    this._container = boardContainer;

    this._navigationComponent = null;
    this._sortingComponent = new SortingView();
    this._filmsBoardComponent = new FilmsBoardView();

    this._allFilmsComponent = new AllFilmsListView();
    this._allFilmsContainerComponent = new FilmsContainerView();

    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topRatedFilmsContainerComponent = new FilmsContainerView();

    this._mostCommentedFilmsComponent = new MostCommentedFilmsView();
    this._mostCommentedFilmsContainerComponent = new FilmsContainerView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._filmPresenter = {};

    this._prevFilmsCount = 0;
    this._showFilmsCount = 5;

    this._films = null;
    this._showingFilms = null;

    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films;
    this._showingFilms = films;
    this._navigationComponent = new NavigationView(films);
    this._renderFilmsBoard();

    if (films.length) {
      this._renderFilms(films);
    } else {
      this._renderNoFilms();
    }
  }

  _renderFilms() {
    this._renderAllFilms();
    if (this._showFilmsCount < this._films.length) {
      this._renderShowMoreButton();
    }
  }

  _renderAllFilms() {
    this._showingFilms.slice(this._prevFilmsCount, this._showFilmsCount)
      .forEach((film) => {
        this._renderFilmCard(film, this._allFilmsContainerComponent);
      });
    render(this._allFilmsComponent, this._allFilmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._showingFilms = updateItem(this._showingFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderTopRatedFilms() {
    this._films.slice().sort((a, b) => b.rating - a.rating)
      .slice(0, SUB_FILMS_COUNT)
        .forEach((film) => this._renderFilmCard(film, this._topRatedFilmsContainerComponent));
    render(this._topRatedFilmsComponent, this._topRatedFilmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedFilms() {
    this._films.slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, SUB_FILMS_COUNT)
        .forEach((film) => this._renderFilmCard(film, this._mostCommentedFilmsContainerComponent));
    render(this._mostCommentedFilmsComponent, this._mostCommentedFilmsContainerComponent, RenderPosition.BEFOREEND);
  }


  _renderFilmCard(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
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

  _getSortedFilms(films, sortType) {
    let sortedFilms = [];
    const copyOfFilms = [...films];

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = copyOfFilms.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = copyOfFilms.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedFilms = copyOfFilms;
        break;
    }
    return sortedFilms;
  }

  _renderFilmsBoard() {
    render(this._container, this._navigationComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsBoardComponent, RenderPosition.BEFOREEND);

    render(this._filmsBoardComponent, this._allFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();

    this._sortingComponent.setSortTypeClickHandler((sortType) => {
      this._allFilmsContainerComponent.getElement().innerHTML = ``;
      this._showingFilms = this._getSortedFilms(this._films, sortType);
      this._prevFilmsCount = 0;
      this._showFilmsCount = 5;
      this._renderFilms();
    });
  }
}

