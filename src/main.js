import {createProfileTemplate} from "./view/profile.js";
import {createMainNavigationTemplate} from "./view/navigation.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createAllFilmsListTemplate} from "./view/all-films-list.js";
import {createFilmTemplate} from "./view/film.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createTopRatedFilmsTemplate} from "./view/top-rated-films.js";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-films.js";

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createProfileTemplate(), `beforeend`);
render(main, createMainNavigationTemplate(), `beforeend`);
render(main, createSortingTemplate(), `beforeend`);
render(main, createFilmsBoardTemplate(), `beforeend`);

const films = main.querySelector(`.films`);

render(films, createAllFilmsListTemplate(), `beforeend`);

const allFilms = films.querySelector(`.films-list`);
const allFilmsContainer = allFilms.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(allFilmsContainer, createFilmTemplate(), `beforeend`);
}

render(allFilms, createShowMoreButtonTemplate(), `beforeend`);
render(films, createTopRatedFilmsTemplate(), `beforeend`);
render(films, createMostCommentedFilmsTemplate(), `beforeend`);

const topRatedFilmsContainer = films.querySelector(`.top-rated`).querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = films.querySelector(`.most-commented`).querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(topRatedFilmsContainer, createFilmTemplate(), `beforeend`);
  render(mostCommentedFilmsContainer, createFilmTemplate(), `beforeend`);
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
