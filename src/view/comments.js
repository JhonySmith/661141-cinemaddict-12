const createCommentMarkup = (comment) => {
  const authorName = comment.authorName;
  const emotion = comment.emotion;
  const commentText = comment.commentText;
  const date = comment.date;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsTemplate = (comments) => {
  const commentsTemplate = comments.map((it) => createCommentMarkup(it)).join(`\n`);
  return (
    `<ul class="film-details__comments-list">
    ${commentsTemplate}
    </ul>`
  );
};
