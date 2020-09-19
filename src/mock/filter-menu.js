const FILTER_TITLES = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateFilters = (films) => {
  const filterCaptions = [
    ``,
    (films.filter((object) => object.isWatchList)).length,
    (films.filter((object) => object.isWatched)).length,
    (films.filter((object) => object.isFavorite)).length
  ];

  return FILTER_TITLES.map((it, i) => {
    return {
      name: it,
      count: filterCaptions[i]
    };
  });
};

export {generateFilters};
