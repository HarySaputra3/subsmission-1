import AddStoryPage from "./add-story-page";

export default class AddStoryPresenter {
  constructor() {
    this.page = new AddStoryPage();
    this.mediaStream = null;
  }

  async init() {
    const content = await this.page.render();
    document.body.innerHTML = content;
    await this.page.afterRender();
    this.mediaStream = this.page.mediaStream;
    window.addEventListener("hashchange", this.handlePageChange.bind(this));
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      this.mediaStream = null;
      console.log("Kamera telah dimatikan.");
    }
  }

  handlePageChange() {
    this.stopCamera();
    console.log("Berpindah halaman: Kamera dimatikan.");
  }

  async submitStory() {
    try {
      await this.page.submitStory();
      this.stopCamera(); 
    } catch (error) {
      console.error("Error during submission:", error);
    }
  }

  capturePhoto() {
    this.page.capturePhoto();
    if (this.page.retakeButton.style.display === "block") {
      this.stopCamera();
    }
  }

  retakePhoto() {
    this.page.retakePhoto();
    if (!this.mediaStream) {
      this.page.setupCamera().then((stream) => {
        this.mediaStream = stream;
      });
    }
  }

  cleanup() {
    this.stopCamera();
    window.removeEventListener("hashchange", this.handlePageChange.bind(this));
  }
}