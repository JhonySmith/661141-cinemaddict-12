export default class Comment {
  constructor(data) {
    this.id = data.id || null;
    this.author = data.author || null;
    this.comment = data.comment;
    this.date = data.date ? new Date(data.date) : null;
    this.emotion = data.emotion;
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion
    };
  }

  static clone(comment) {
    return new Comment(comment.toRAW());
  }
}
