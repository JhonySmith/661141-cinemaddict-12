export const createFilmTemplate = (film) => {
  const title = film.title;
  const rating = film.rating;
  const releaseDate = film.releaseDate;
  const genre = film.genre;
  const poster = film.poster;
  const description = film.description;
  const commentsCount = film.comments.length;
  const inWatchList = film.inWatchList ? `film-card__controls-item--active` : ``;
  const viewed = film.viewed ? `film-card__controls-item--active` : ``;
  const inFavoriteList = film.inFavoriteList ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${commentsCount} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchList}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${viewed}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${inFavoriteList}">Mark as favorite</button>
        </form>
      </article>`
  );
};
