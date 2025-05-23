import FavoritesPresenter from "./favorite-presenter";

export default class FavoritesPage {
  constructor() {
    this.presenter = new FavoritesPresenter();
  }

  async render() {
    return this.presenter.render(); 
  }

  async afterRender() {
    await this.presenter.afterRender(); 
  }
}
