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
    this.caption = "";
  }

  static get styles() {
    return css`
      :host {
        /* Always make sure that your element has a default way of being displayed */
        --background-color: #6b6a6a;
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
        background-color: var(--background-color);
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
      }

      .caption {
        text-align: center;
      }
     `;
  }

  render() {
    console.log("Image URL:", this.image);
    return html`
      <div id="card-container">
        <div class="image-container">
          <img src="${this.image}" width=300px>       
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

  ImageContent() {
    //js for array of images
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
