export default class Film {
  constructor(data) {
    this.id = data.id;
    this.comments = data.comments;
    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.rating = data.film_info.total_rating;
    this.poster = data.film_info.poster;
    this.ageRaiting = data.film_info.age_rating;
    this.director = data.film_info.director;
    this.screenwriters = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.releaseDate = data.film_info.release.date;
    this.releaseCountry = data.film_info.release.release_country;
    this.movieDuration = data.film_info.runtime;
    this.genre = data.film_info.genre;
    this.description = data.film_info.description;
    this.inWatchList = Boolean(data.user_details.watchlist);
    this.viewed = Boolean(data.user_details.already_watched);
    this.viewedDate = data.user_details.watching_date;
    this.inFavoriteList = Boolean(data.user_details.favorite);
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static toServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'actors': film.actors,
        'age_rating': film.ageRaiting,
        'alternative_title': film.originalTitle,
        'total_rating': film.rating,
        'description': film.description,
        'director': film.director,
        'genre': film.genre,
        'poster': film.poster,
        'release': {
          'date': film.releaseDate,
          'release_country': film.releaseCountry
        },
        'runtime': film.movieDuration,
        'writers': film.screenwriters
      },
      'user_details': {
        'already_watched': film.viewed,
        'favorite': film.inFavoriteList,
        'watching_date': film.viewedDate,
        'watchlist': film.inWatchList
      },
    };
  }
}
