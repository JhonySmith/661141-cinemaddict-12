import {createCommentsTemplate} from "./comments";
import AbstractSmart from "./abstract-smart.js";
// Карточка с деталями фильма

const createFilmDetailsTemplate = (film, comments, commentEmoji) => {
  const title = film.title;
  const originalTitle = film.originalTitle;
  const poster = film.poster;
  const director = film.director;
  const description = film.description;
  const rating = film.rating;
  const commentsTemplate = createCommentsTemplate(comments);
  const movieDuration = film.movieDuration;
  const screenwriter = film.screenwriter;
  const viewed = film.viewed ? `checked` : ``;
  const inFavoriteList = film.inFavoriteList ? `checked` : ``;
  const inWatchList = film.inWatchList ? `checked` : ``;
  const emojiMarkup = commentEmoji ? `<img src="./images/emoji/${commentEmoji}.png" alt="${commentEmoji}" width="55" height="55">` : ` `;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">18+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">${director}</td>
                  <td class="film-details__cell">Anthony Mann</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriter}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">30 March 1945</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${movieDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">USA</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">Drama</span>
                    <span class="film-details__genre">Film-Noir</span>
                    <span class="film-details__genre">Mystery</span></td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchList}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${viewed}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${inFavoriteList}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${commentsTemplate}
            <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                <input type="hidden" name="add-emoji" value="${commentEmoji}">
                ${emojiMarkup}
                </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmart {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;

    this._onObjectClick = null;
    this.commentEmoji = null;
    this._subscribeOnEvents();

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._addToFavoriteListClickHandler = this._addToFavoriteListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._comments);
  }

  restoreHandlers() {
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.closeButtonClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;

    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeButtonClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();

    this._callback.addToWatchClick();
    this.restoreHandlers();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchClick = callback;

    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._addToWatchListClickHandler);
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();

    this._callback.markAsWatchedClick();
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;

    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._markAsWatchedClickHandler);
  }

  _addToFavoriteListClickHandler(evt) {
    evt.preventDefault();

    this._callback.ddToFavoriteListClick();
  }

  setAddToFavoriteListClickHandler(callback) {
    this._callback.ddToFavoriteListClick = callback;

    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._addToFavoriteListClickHandler);
  }

  setDelelteClick(onClick) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((delButton) => {
        delButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentId = evt.target.closest(`li`).dataset.id;
          const button = evt.target.closest(`button`);
          button.textContent = `Deleting...`;
          button.disabled = true;
          onClick(commentId);
        });
      });
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this.commentEmoji = evt.target.value;
      this.rerender();
    });
  }
}
