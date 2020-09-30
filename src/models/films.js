import {getFilmsByFilter} from "../utils/filter.js";
import {Filters as FilterType} from "../common/constants.js";

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._onDataChanges = [];
    this._onFilterChanges = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callEvents(this._onDataChanges);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callEvents(this._onFilterChanges);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callEvents(this._onDataChanges);

    return true;
  }

  setOnDataChange(onChange) {
    this._onDataChanges.push(onChange);
  }

  setOnFilterChange(onChange) {
    this._onFilterChanges.push(onChange);
  }

  _callEvents(events) {
    events.forEach((event) => event());
  }
}
