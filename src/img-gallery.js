import { LitElement, html, css } from 'lit';
import "./media-image.js";

export class ImgGallery extends LitElement {

  static get tag() {
    return 'img-gallery';
  }

  // constructor establishes defaults for the class
  constructor() {
    super();
    this.title = "img-gallery";
    this.slides = [];
    this.index = 0;
    this.open = false;
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
        <button class="exitButton" @click=${this.closeButton}>x</button>
        <div class="displayContainer">
            <button class="leftArrow" @click="${this.previousSlide}"> < </button>
            ${this.displaySlide()}
            <button class="rightArrow" @click="${this.nextSlide}"> > </button>
        </div>
      </div>
    </div>`;
  }

  nextSlide() {
    if (this.index < this.slides.length - 1) {
      this.index++;
      this.requestUpdate();
    }
  }
  previousSlide() {
    if (this.index > 0) {
      this.index--;
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
        <img class="image" src="${this.slides[this.index].image}" @click=${this.handleImageClick} />
        <p>Slide ${this.index + 1} / ${this.slides.length}</p>
        <h1 class="caption">${this.slides[this.index].caption}</h1>
        <p class="description">${this.slides[this.index].description}</p>
      </div>
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      open: { type: Boolean, reflect: true}
    };
  }
}


globalThis.customElements.define(ImgGallery.tag, ImgGallery);
