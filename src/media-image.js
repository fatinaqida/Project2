import { LitElement, html, css } from 'lit';

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
    this.imageData = [];
    this.visible = false;
  }

  static get styles() {
    return css`
      :root, :host {
        /* Always make sure that your element has a default way of being displayed */
        --media-image-primary-color-1: #6b6a6a;
        --media-image-primary-color-2: #a1eafb;
        --secondary-color: #f7f7f7;
        --font-family-1: georgia, serif;
        --font-family-2: courier, serif;
        display: inline-flex;
        background: var(--background-color);
        width: 100%;
      }

      span {
        background-color: orange;
        color: black;
        font-size: 24px;
        padding: 16px;
        margin: 8px;
      }

      span:hover {
        background-color: grey;
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

      .left-arrow {
        width: 0;
        height: 0;
      }

      .image-container:hover {
        background-color: grey;
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
     `;
  }

  
  render() {
    console.log("Image URL:", this.image);
    return html`
      <div id="card-container">
        <div class="image-container">
          <div class="what">
            <img src="${this.image}" width="250px" height="250px" @click="${this.contentClicked}">
          </div>
          <div class="caption">
            <h1>${this.caption}</h1>
          </div>
        </div>
        
        <div class="description">
            ${this.description}
        </div>
        
      </div>
    ` 
  }

  contentClicked(){
    this.createOpenGalleryEvent();
    this.updateIndex();
  }

  updateIndex(){
    document.body.querySelector("img-gallery").count = this.count;
  }

  createOpenGalleryEvent(imageUrl){
    this.dispatchEvent(new CustomEvent("gallery-open", {
      bubbles: true, 
      composed: true, 
      cancelable: true, 
      detail: { index: this.getAttribute('count'), imageUrl: this.getAttribute('image')}
    }));
  }

  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      image: { type: String, Reflect: true },
      caption: { type: String, Reflect: true }, 
      description: { type: String, Reflect: true }, 
      imageData: { type: Array, Reflect: true },
      //visible: { type: Boolean, Reflect: true }, 
      count: { type: Number, Reflect: true }
    };
  }
}

globalThis.customElements.define(mediaImage.tag, mediaImage);
