import { LitElement, html, css } from 'lit';
import "./media-image.js";

export class ImgGallery extends LitElement {

  static get tag() {
    return 'img-gallery';
  }

  // constructor establishes defaults for the class
  constructor() {
    super();
    this.slides = [];
    this.index = 0;
    this.open = false;
    this.currentImage = "";
    this.currentImageIndex = 0;
  }


  static get styles() {
    
    return css`
    
    :host {
        --container-width: 70vw;
        --container-height: 90vh;
        display: inline-flex;
    }

    .container {
        width: var(--container-width);
        height: var(--container-height);
        display: flex;
        background-color: lightblue;
        z-index: 100000;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }
    `;
  }

  closeButton() {
    this.open = false;
  }

  render() { 
    if (!this.open) {
      return html``;
    }
    return html` <div class="dialogBox">
      <div class="container">
        <button class="exitButton" @click=${this.closeButton}>&times;</button>
        <div class="displayContainer">
            <button class="leftArrow" @click="${this.previousSlide}"> < </button>
            ${this.displaySlide()}
            <button class="rightArrow" @click="${this.nextSlide}"> > </button>
        </div>
      </div>
    </div>`;
  }

  nextSlide() {
    if (this.currentImageIndex <= this.slides.length - 1) {
      this.currentImageIndex++;
      this.requestUpdate();
    }
  }
  previousSlide() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.requestUpdate();
    }
  }

  firstUpdated() {
    this.addOpenImageEventListener();
    this.populateSlide();
  }

  addOpenImageEventListener() {
    window.addEventListener("gallery-open", (e) => {
      this.open = true;
      console.log("open dialog");

        // Get the image URL and index from tmedia-image
        const imageUrl = e.detail.imageUrl;
        const index = e.detail.index;

        // Set the currentImage and currentImageIndex according to the received image URL and its index
        this.currentImage = imageUrl;
        this.currentImageIndex = index;
    });
    console.log("added event listener");
  }

  populateSlide() {
    document.body.querySelectorAll("media-image").forEach((image) => {
        image.count = this.slides.length;
        this.slides.push(image);
    });
  }

  displaySlide() {
    return html`
      <div>
        <img class="image" src="${this.slides[this.currentImageIndex-1].image}" />
        <p>Slide ${this.currentImageIndex} / ${this.slides.length}</p>
        <h1 class="caption">${this.slides[this.currentImageIndex-1].caption}</h1>
        <p class="description">${this.slides[this.currentImageIndex-1].description}</p>
      </div>
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      open: { type: Boolean, reflect: true}, 
      index: { type: Number, reflect: true}, 
      slides: { type: Array, reflect: true}, 
      currentImage: { type: String, reflect: true}, 
      currentImageIndex: { type: Number, reflect: true}
    };
  }
}


globalThis.customElements.define(ImgGallery.tag, ImgGallery);
