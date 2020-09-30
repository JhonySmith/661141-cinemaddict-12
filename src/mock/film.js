import {getRandomNumer, getRandomArrElement} from "../utils.js";
import {generateCommentsArr} from "./comments";

const titles = [`The Dance of life`, `Sagebrush Trail`, `The Man with the Golden Arm`];

const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const directors = [`Aash Aaron`, `J.J. Abrams`, `Jim Abrahams`, `Jon Avnet`];

const screenwriters = [`Aash Aaron`, `J.J. Abrams`, `Jim Abrahams`, `Jon Avnet`];

const genres = [`horror`, `comedy`, `drama`];

const generateDescriptoin = (texts) => {
  const textsCount = getRandomNumer(1, 6);
  const descriptionStartIndex = getRandomNumer(1, texts.length - textsCount);
  const descriptionEndIndex = descriptionStartIndex + textsCount;
  return texts.slice(descriptionStartIndex, descriptionEndIndex).map((it) => {
    return it;
  }).join(` `);
};

const generateFilmCardData = () => {
  const id = Date.now() + parseInt(Math.random() * 10000, 10);
  const title = getRandomArrElement(titles);
  const originalTitle = getRandomArrElement(titles);
  const rating = (Math.floor(Math.random() * 100)) / 10;
  const movieDuration = getRandomNumer(1, 2) + `h ` + getRandomNumer(0, 59) + `m`;
  const director = getRandomArrElement(directors);
  const genre = getRandomArrElement(genres);
  const screenwriter = getRandomArrElement(screenwriters);
  const comments = generateCommentsArr(getRandomNumer(1, 5));
  const poster = getRandomArrElement(posters);
  const description = generateDescriptoin(descriptions);
  const inWatchList = Math.random() > 0.5;
  const viewed = Math.random() > 0.5;
  const inFavoriteList = Math.random() > 0.5;
  const ageRaiting = getRandomNumer(0, 18) + `+`;
  const releaseDate = getRandomNumer(1970, 2020);


  return {
    id,
    title,
    originalTitle,
    rating,
    movieDuration,
    director,
    genre,
    screenwriter,
    poster,
    description,
    inWatchList,
    viewed,
    inFavoriteList,
    comments,
    ageRaiting,
    releaseDate
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateFilmCardData);
};

export {generateFilmCardData, generateFilmCards};
