import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class mediaImage extends LitElement {

  static get tag() {
    return 'media-image';
  }

  constructor() {
    super(); 
    this.count = 0;
    this.image = "";
    this.description = "";
    this.caption = "caption";
  }

  static get styles() {
    return css`
      :root, :host {
        /* Always make sure that your element has a default way of being displayed */
        --media-image-primary-color-1: var(--ddd-theme-default-potential50);
        --media-image-primary-color-2: var(--ddd-theme-default-coalyGray);
        --media-image-secondary-color: var(--ddd-theme-default-limestoneGray);
        --font-family-1: georgia, serif;
        --font-family-2: courier, serif;
        display: inline-flex;
        background: var(--background-color);
        width: 100%;
      }

      span {
        background-color: var(--media-image-primary-color-1);
        color: var(--media-image-primary-color-2);
        font-size: 24px;
        padding: 16px;
        margin: 8px;
      }

      span:hover {
        background-color: var(--media-image-primary-color-1);
        border: 1px solid black;
      }

      #card-container {
        display: flex;
        margin: 0 auto;
        background-color: var(--media-image-primary-color-1);
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      .image-container {
        display: inline-block;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 16px;
        text-align: center;
        justify-content: flex-start;
        width: 300px;
        height: 300px;
      }

      .image-container:hover {
        background-color: var(--media-image-secondary-color);
        border-radius: var( --ddd-radius-xl);
        box-shadow: var(--ddd-boxShadow-lg);
      }

      .description {
        display: block;
        font-size: 16px;
        text-align: center;
        font-family: var(--font-family-1);
        max-width: 30%;
        line-height: 1.5;
      }

      .caption {
        display: block;
        text-align: center;
        font-family: var(--font-family-2);
        font-size: 13px;
      }

      .mediaImage {
        display: block;
        position: relative;
        margin: auto;
        text-align: center;
      }
     `;
  }

  
  render() {
    return html`
      <div id="card-container">
        <div class="image-container">
          <div class="mediaImage">
            <img src="${this.image}" width="250px" height="250px" @click="${this.contentClicked}">
          </div>

          <!-- caption in the media image -->
          <div class="caption">
            <h1>${this.caption}</h1>
          </div>
        </div>
        
        <!-- description in the media image -->
        <div class="description">
            ${this.description}
        </div>
        
      </div>
    ` 
  }

  // This function is called when the image is clicked
  contentClicked(){
    this.createOpenGalleryEvent();
    this.updateIndex();
  }

  // This function is to update the index of the image and send data to play-list.js for dialog box
  updateIndex(){
    document.body.querySelector("play-list").count = this.count;
  }

  // This function is to create a custom event to open the gallery
  createOpenGalleryEvent(imageUrl){
    this.dispatchEvent(new CustomEvent("gallery-open", {
      bubbles: true, 
      composed: true, 
      cancelable: true, 
      //this is to retrieve the url and index for each of the image from index.html
      detail: { index: this.getAttribute('count'), imageUrl: this.getAttribute('image')}
    }));
  }

  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      image: { type: String, Reflect: true },
      caption: { type: String, Reflect: true }, 
      description: { type: String, Reflect: true }, 
      count: { type: Number, Reflect: true }
    };
  }
}

globalThis.customElements.define(mediaImage.tag, mediaImage);
