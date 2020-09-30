import API from "./api.js";

import FilmsModel from "./models/films.js";

import ProfileView from "./view/profile.js";
import FooterStatisticView from "./view/footer-statistic.js";

import {render, RenderPosition} from "./utils.js";

import BoardPresenter from "./presenter/board.js";

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const header = document.querySelector(`.header`);
render(header, new ProfileView(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);

const boardPresenter = new BoardPresenter(main, filmsModel, api);

const pageFooter = document.querySelector(`.footer`);


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
  })
  .catch(() => {
    filmsModel.setFilms([]);
  })
  .finally(() => {
    boardPresenter.init();
    const footerStatisticComponent = new FooterStatisticView(filmsModel.getFilms());
    render(pageFooter, footerStatisticComponent, RenderPosition.BEFOREEND);
  });
