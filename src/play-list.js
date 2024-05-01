import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "./media-image.js";

export class playList extends LitElement {

  static get tag() {
    return 'play-list';
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
        --container-width: 60vw;
        --container-height: 75vh;
        --font-family-1: georgia, serif;  
        --font-family-2: courier, serif;
        --play-list-primary-color-1: var(--ddd-theme-default-linkLight);
        --play-list-primary-color-2: var(--ddd-theme-default-errorLight);
        --play-list-secondary-color-1: var(--ddd-theme-default-alertImmediate);
        --play-list-secondary-color-2: var(--ddd-theme-default-info);
        --play-list-secondary-color-3: var(--ddd-theme-default-roarMaxlight);
        display: inline-flex;
    }

    :host([open]) {
      display: flex;
      z-index: 100000;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); 
    }

    .container {
      width: var(--container-width);
      height: var(--container-height);
      display: flex;
      background-color: var(--play-list-primary-color-1);
      z-index: 100000;
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;     
      border: 3px solid #000000;
      padding: 20px;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      transform: translate(
        -50%,
        -50%
      );
      overflow: hidden;
    }

    .exitButton { 
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      background: none;
      border: none;
      cursor: pointer;
      box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
      padding: 8px 8px 8px 8px;
      background-color: var(--play-list-secondary-color-1);
      border-radius: 10px;
    }

    .exitButton:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
      border: 1px solid var(--play-list-secondary-color-2);
    }

    .leftArrow {
      align-items: center;
      background-color: var(--play-list-primary-color-2);
      background-position: 0 0;
      border: 1px solid #FEE0E0;
      border-radius: 11px;
      box-sizing: border-box;
      color: #D33A2C;
      cursor: pointer;
      display: flex;
      font-size: 1rem;
      font-weight: 700;
      line-height: 33.4929px;
      list-style: outside url(https://www.smashingmagazine.com/images/bullet.svg) none;
      padding: 2px 12px;
      text-align: left;
      text-decoration: none;
      text-shadow: none;
      text-underline-offset: 1px;
      transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      word-break: break-word;
    }

    .leftArrow:hover, 
    .leftArrow:active, 
    .leftArrow:focus, 
    .rightArrow:hover, 
    .rightArrowL:active,
    .rightArrow:focus {
      box-shadow: rgba(128, 0, 128, 0.35) 0 -25px 18px -14px inset, rgba(128, 0, 128, 0.25) 0 1px 2px, rgba(128, 0, 128, 0.25) 0 2px 4px, rgba(128, 0, 128, 0.25) 0 4px 8px, rgba(128, 0, 128, 0.25) 0 8px 16px, rgba(128, 0, 128, 0.25) 0 16px 32px;
      transform: scale(1.05) rotate(-1deg);
    }

    .leftArrow:active, 
    .rightArrow:active {
      background-color: #5e2cd3;
      box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
      color: #FFFFFF;
    }

    .leftArrow:hover, 
    .rightArrow:hover {
      background-color: #FFE3E3;
      border-color: #FAA4A4;
    }

    .rightArrow {
      align-items: center;
      background-color: var(--play-list-secondary-color-3);
      background-position: 0 0;
      border: 1px solid #FEE0E0;
      border-radius: 11px;
      box-sizing: border-box;
      color: #D33A2C;
      cursor: pointer;
      display: flex;
      font-size: 1rem;
      font-weight: 700;
      line-height: 33.4929px;
      list-style: outside url(https://www.smashingmagazine.com/images/bullet.svg) none;
      padding: 2px 12px;
      text-align: left;
      text-decoration: none;
      text-shadow: none;
      text-underline-offset: 1px;
      transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      white-space: nowrap;
      word-break: break-word;
    }

    button:disabled {
      opacity: 0.6; /* Reduce opacity to visually indicate the button is disabled */
      cursor: not-allowed; /* Change cursor to indicate that the button is not clickable */
    }

    .displayContainer {
      display: flex;
      justify-content: center; 
      align-items: center; 
      width: 100%;
      height: 100%;
    }

    .image {
      display: block;
      position: relative;
      margin: auto;
      width: 230px;
      height: 230px;
      text-align: center;
    }

    .caption {
      position: relative;
      text-align: center;
      font-family: var(--font-family-2);
      font-size: 36px;
    }

    .description {
      position: relative;
      text-align: center;
      font-family: var(--font-family-1);
      font-size: 16px;
      line-height: 1.5;
    }

    .slideNumber {
      position: absolute;
      top: 3px;
      left: 10px;
      font-family: var(--font-family-1);
    }

    `;
  }

  closeButton() {
    this.open = false;
    this.toEnableScroll();
  }

  render() { 
    if (!this.open) {
      return html``;
    }

    //for disabled function for left and right arrow
    const isFirstSlide = this.currentImageIndex == 1;
    const isLastSlide = this.currentImageIndex == this.slides.length;

    return html` <div class="dialogBox">
      <div class="container">
        <button class="exitButton" @click=${this.closeButton}>&times;</button>
        <div class="displayContainer">
            <!-- disabled left button if it is the first image -->
            <button class="leftArrow" @click="${this.previousSlide}" ?disabled="${isFirstSlide}"> < </button>

            <!-- to display the image -->
            ${this.displaySlide()}

            <!-- disabled right button if it is the last image -->
            <button class="rightArrow" @click="${this.nextSlide}" ?disabled="${isLastSlide}"> > </button>
        </div>
      </div>
    </div>`;
  }

  // function to go to the next slide
  nextSlide() {
    if (this.currentImageIndex <= this.slides.length - 1) {
      this.currentImageIndex++;
      this.requestUpdate();
    }
  }

  // function to go to the previous slide
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

  // function to listen to the gallery-open event
  addOpenImageEventListener() {
    window.addEventListener("gallery-open", (e) => {
      this.open = true;
      console.log("open dialog");

      // Get the image URL and index from media-image
      const imageUrl = e.detail.imageUrl;
      const index = e.detail.index;

      // Set the currentImage and currentImageIndex according to the received image URL and its index
      this.currentImage = imageUrl;
      this.currentImageIndex = index;

      this.toDisableScroll();
    });
    
  }

  // function to populate the slides array with the images
  populateSlide() {
    document.body.querySelectorAll("media-image").forEach((image) => {
        image.count = this.slides.length;
        this.slides.push(image);
    });
  }

  // function to display the image according to the index
  displaySlide() {
    return html`
      <div>
        <img class="image" src="${this.slides[this.currentImageIndex-1].image}" />
        <p class="slideNumber" >Slide ${this.currentImageIndex} / ${this.slides.length}</p>
        <h1 class="caption">${this.slides[this.currentImageIndex-1].caption}</h1>
        <p class="description">${this.slides[this.currentImageIndex-1].description}</p>
      </div>
    `;
  }

  toDisableScroll() {
    document.body.style.overflow = "hidden";//to disable scroll
  }

  toEnableScroll() {
    document.body.style.overflow = "";

    //to enable scrolling after close button is clicked
    if (this._scrollPosition) {
      window.scrollTo(this._scrollPosition.left, this._scrollPosition.top);
    }
  }

  static get properties() {
    return {
      ...super.properties,
      open: { type: Boolean, reflect: true }, 
      index: { type: Number, reflect: true }, 
      slides: { type: Array, reflect: true }, 
      currentImage: { type: String, reflect: true }, 
      currentImageIndex: { type: Number, reflect: true }
    };
  }
}

globalThis.customElements.define(playList.tag, playList);
