import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  add(updateType, update) {
    this._comments.push(update);

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }
    this._comments.splice(index, 1);

    /* this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ]; */

    this._notify(updateType);
  }
}
