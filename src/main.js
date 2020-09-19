import {createProfileTemplate} from "./view/profile.js";
import {createMainNavigationTemplate} from "./view/navigation.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createAllFilmsListTemplate} from "./view/all-films-list.js";
import {createFilmTemplate} from "./view/film.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createTopRatedFilmsTemplate} from "./view/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-films.js";

import {generateFilmCards} from "./mock/film.js";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const films = generateFilmCards(FILMS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createProfileTemplate(), `beforeend`);
render(main, createMainNavigationTemplate(), `beforeend`);
render(main, createSortingTemplate(), `beforeend`);
render(main, createFilmsBoardTemplate(), `beforeend`);

const filmsContainer = main.querySelector(`.films`);

render(filmsContainer, createAllFilmsListTemplate(), `beforeend`);

const allFilms = filmsContainer.querySelector(`.films-list`);
const allFilmsContainer = allFilms.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(allFilmsContainer, createFilmTemplate(films[i]), `beforeend`);
}

render(allFilms, createShowMoreButtonTemplate(), `beforeend`);
render(filmsContainer, createTopRatedFilmsTemplate(), `beforeend`);
render(filmsContainer, createMostCommentedFilmsTemplate(), `beforeend`);

const topRatedFilmsContainer = filmsContainer.querySelector(`.top-rated`).querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = filmsContainer.querySelector(`.most-commented`).querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedFilmsContainer, createFilmTemplate(films[i]), `beforeend`);
  render(mostCommentedFilmsContainer, createFilmTemplate(films[i]), `beforeend`);
}

const createFooterStatisticTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

const footer = document.querySelector(`.footer`);
render(footer, createFooterStatisticTemplate(), `beforeend`);
