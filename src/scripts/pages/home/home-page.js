import HomePresenter from "./home-presenter.js";

export default class HomePage {
  constructor() {
    this.presenter = new HomePresenter();
  }

  async render() {
    return this.presenter.render(); 
  }

  async afterRender() {
    await this.presenter.afterRender(); 
  }
}
