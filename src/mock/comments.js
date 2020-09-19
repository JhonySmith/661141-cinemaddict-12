import {getRandomArrElement, getRandomNumer} from "../utils.js";

const authorNames = [`Tim Macoveev`, `John Doe`];
const emotions = [`angry`, `puke`, `sleeping`, `smile`];
const comments = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];

const getRandomDate = () => {
  const targetDate = new Date();
  const dateMem = new Date();

  targetDate.setDate(targetDate.getDate() - getRandomNumer(0, 5));
  const options = {weekday: `long`, year: `numeric`, month: `long`, day: `numeric`, hour: `numeric`, minute: `numeric`, hour12: false};
  const diffTime = dateMem.getDate() - targetDate.getDate();

  if (diffTime > 2) {
    return targetDate.toLocaleString(`en-US`, options);
  } else if (diffTime === 0) {
    return `today`;
  } else {
    return diffTime + ` days ago`;
  }
};

const generateComment = () => {
  return {
    authorName: getRandomArrElement(authorNames),
    emotion: getRandomArrElement(emotions),
    commentText: getRandomArrElement(comments),
    date: getRandomDate(),
  };
};

const generateCommentsArr = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateCommentsArr};
