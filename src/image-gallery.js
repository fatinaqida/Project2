import { LitElement, html, css } from 'lit';

export class imageGallery extends LitElement {

  static get tag() {
    return 'image-gallery';
  }

  constructor() {
    super();
    this.title = "imageGallery";    
  }

  static get styles() {
    return css`
      :host {
        /* Always make sure that your element has a default way of being displayed */
        --background-color: #6b6a6a;
        display: inline-flex;
        background: var(--background-color);
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
        display: inline-block;
        margin: 0 auto;
        background-color: var(--background-color);
        width: 100%;
        text-align: center;
      }

      .image-container {
        display: inline-block;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 16px;
        text-align: center;
      }

      .left-arrow {
        width: 0;
        height: 0;
      }

      .image-container:hover {
        background-color: grey;
      }
    `;
  }

  render() {
    return html`
      <div id="card-container">
        <div class="image-container">
          <img src="https://pbs.twimg.com/media/DHYQGS9V0AENXTL?format=jpg&name=4096x4096" alt="Image 1" width="200" height="200">
          <div class="left-arrow">
          </div>
        </div>
      </div>
    ` 
  }

  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      title: { type: String },
    };
  }
}

globalThis.customElements.define(imageGallery.tag, imageGallery);
