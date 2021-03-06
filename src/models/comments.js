export default class Comments {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index > -1) {
      this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
      return true;
    }

    return false;
  }
}
