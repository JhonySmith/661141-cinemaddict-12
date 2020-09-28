import ProfileView from "./view/profile.js";
import FooterStatisticView from "./view/footer-statistic.js";

import {generateFilmCards} from "./mock/film.js";
import {render, RenderPosition} from "./utils.js";

import BoardPresenter from "./presenter/board.js";

const FILMS_COUNT = 10;

const films = generateFilmCards(FILMS_COUNT);

const header = document.querySelector(`.header`);
render(header, new ProfileView(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
const boardPresenter = new BoardPresenter(main);
boardPresenter.init(films);

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatisticView(), `beforeend`);
