import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortingView from "./view/sorting.js";
import AllFilmsListView from "./view/all-films-list.js";
import FilmView from "./view/film.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsBoardView from "./view/films-board.js";
import TopRatedFilmsView from "./view/top-rated-films.js";
import MostCommentedFilmsView from "./view/most-commented-films.js";

import {generateFilmCards} from "./mock/film.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const films = generateFilmCards(FILMS_COUNT);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

renderElement(header, new ProfileView().getElement(), `beforeend`);
renderElement(main, new NavigationView().getElement(), `beforeend`);
renderElement(main, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new FilmsBoardView().getElement(), `beforeend`);

const filmsContainer = main.querySelector(`.films`);

renderElement(filmsContainer, new AllFilmsListView().getElement(), `beforeend`);

const allFilms = filmsContainer.querySelector(`.films-list`);
const allFilmsContainer = allFilms.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  renderElement(allFilmsContainer, new FilmView(films[i]).getElement(), `beforeend`);
}

renderElement(allFilms, new ShowMoreButtonView().getElement(), `beforeend`);
renderElement(filmsContainer, new TopRatedFilmsView().getElement(), `beforeend`);
renderElement(filmsContainer, new MostCommentedFilmsView().getElement(), `beforeend`);

const topRatedFilmsContainer = filmsContainer.querySelector(`.top-rated`).querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = filmsContainer.querySelector(`.most-commented`).querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderElement(topRatedFilmsContainer, new FilmView(films[i]).getElement(), `beforeend`);
  renderElement(mostCommentedFilmsContainer, new FilmView(films[i]).getElement(), `beforeend`);
}

const createFooterStatisticTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

const footer = document.querySelector(`.footer`);
renderTemplate(footer, createFooterStatisticTemplate(), `beforeend`);
