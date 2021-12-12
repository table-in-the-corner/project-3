import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';

export class SortableOption extends LitElement {
  static get tag() {
    return 'sortable-option';
  }

  constructor() {
    super();
    this.choice = 'option 1';
    this.addEventListener('drag', this.drag);
    this.position = 0;
    this.dragPosition = 0;
    // this.addEventListener('mou')
  }

  static get properties() {
    return {
      choice: { type: String, reflect: true },
      position: { type: Number },
      dragPosition: { type: Number },
    };
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
      document
        .querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')[0]
        .shadowRoot.querySelector('.up').disabled = true;
      if (
        document
          .querySelector('sortable-frame')
          .shadowRoot.querySelector('.frame')
          .querySelector('#options')
          .querySelectorAll('sortable-option')
          [this.parentElement.children.length - 1].shadowRoot.querySelector(
            '.down'
          )
      ) {
        document
          .querySelector('sortable-frame')
          .shadowRoot.querySelector('.frame')
          .querySelector('#options')
          .querySelectorAll('sortable-option')
          [this.parentElement.children.length - 1].shadowRoot.querySelector(
            '.down'
          ).disabled = true;
      }
    }
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (
        propName === 'choice' &&
        this[propName] === 'http://localhost:8000/assets/goldenretriever.jpeg'
      ) {
        const node = document.createElement('img');
        node.setAttribute('alt', '');
        node.setAttribute('src', this[propName]);
        node.style.width = '50px';
        this.shadowRoot.querySelector('slot').appendChild(node);
        // console.log(this.shadowRoot.querySelector('slot'))
      }
      if (
        propName === 'choice' &&
        this[propName] === 'http://localhost:8000/assets/husky.jpeg'
      ) {
        const node = document.createElement('img');
        node.setAttribute('alt', '');
        node.setAttribute('src', this[propName]);
        node.style.width = '50px';
        this.shadowRoot.querySelector('slot').appendChild(node);
      }
      if (
        propName === 'choice' &&
        this[propName] === 'http://localhost:8000/assets/memedog.jpeg'
      ) {
        const node = document.createElement('img');
        node.setAttribute('alt', '');
        node.setAttribute('src', this[propName]);
        node.style.width = '50px';
        this.shadowRoot.querySelector('slot').appendChild(node);
      }
    });
  }

  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  connectedCallback() {
    super.connectedCallback();
  }

  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  getPosition() {
    const pos = window.event;
    const posY = pos.clientY;
    this.position = posY;
    // console.log(this.position)
  }

  // The Mouse position, drag position, and offSetTop logic was taken nearly directly from Sean's SlimeSorting Implementation
  // The overall idea of how to go about dragging to sort each option was taken from Sean as well
  drag(ev) {
    const pos = ev.clientY;
    let currentIndex = 0;
    this.dragPosition = this.position - this.offsetTop;
    // console.log(this.offsetTop - this.position)
    if (pos !== 0) {
      this.position = pos;
    }

    // console.log(this.offsetTop - this.position)
    for (
      let index = 0;
      index < this.parentElement.children.length;
      index += 1
    ) {
      if (this === this.parentElement.children[index]) {
        currentIndex = index;
      }
      // if (this.dragPosition < 0){
      // console.log(this.offsetTop - this.position)
      // console.log(this.offsetTop - this.position)
      if (this.offsetTop - this.position > 165) {
        // https://stackoverflow.com/questions/9732624/how-to-swap-dom-child-nodes-in-javascript
        // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
        this.parentElement.insertBefore(
          this,
          this.parentElement.children[currentIndex]
        );
      }
      // }
      // if (this.dragPosition > 0){
      if (this.offsetTop - this.position < 100) {
        this.parentElement.insertBefore(
          this,
          this.parentElement.children[currentIndex + 1].nextElementSibling
        );
      }
      this.disable();
      // }
    }
  }

  upbtn() {
    if (this.previousElementSibling != null) {
      const before = this.previousElementSibling;

      document
        .querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')
        .forEach(option => {
          option.shadowRoot.querySelectorAll('button').forEach(but => {
            // eslint-disable-next-line no-param-reassign
            but.disabled = false;
          });
        });
      this.parentNode.insertBefore(this, before);
      this.disable();
    }
  }

  disable() {
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.frame')
      .querySelector('#options')
      .querySelectorAll('sortable-option')
      .forEach(option => {
        option.shadowRoot.querySelectorAll('button').forEach(but => {
          // eslint-disable-next-line no-param-reassign
          but.disabled = false;
        });
      });
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.frame')
      .querySelector('#options')
      .querySelectorAll('sortable-option')[0]
      .shadowRoot.querySelector('.up').disabled = true;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.frame')
      .querySelector('#options')
      .querySelectorAll('sortable-option')
      [this.parentElement.children.length - 1].shadowRoot.querySelector(
        '.down'
      ).disabled = true;
  }

  downbtn() {
    if (this.nextElementSibling != null) {
      const after = this.nextElementSibling;

      document
        .querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')
        .forEach(option => {
          option.shadowRoot.querySelectorAll('button').forEach(but => {
            // eslint-disable-next-line no-param-reassign
            but.disabled = false;
          });
        });
      this.parentNode.insertBefore(after, this);
      this.disable();
    }
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .option {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        /* display: block; */
        font-family: 'Open Sans', sans-serif;
        color: black;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
        box-shadow: 2px 2px 5px 0px gray;
        background-color: lightgray;
        height: 60px;
        /* min-width: 700px; */
        border-radius: 7px;
        text-align: left;
      }

      .up,
      .down {
        margin: 10px;
        background-color: white;
        height: 30px;
        border-radius: 7px;
        float: right;
        border: transparent;
        box-shadow: 2px 2px 5px 0px gray;
      }
      .buttonContainer {
        display: flex;
        flex-direction: row;
      }
      .buttonContainer,
      button {
        margin-left: 5px;
      }
      .option[draggable='false'] {
        background-color: rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.3);
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="option" draggable="true">
        <slot name="choice">${this.choice} </slot>
        <div class="buttonContainer">
          <button class="down" @click=${this.downbtn}>
            <simple-icon-lite icon="expand-more"></simple-icon-lite>
          </button>
          <button class="up" @click=${this.upbtn}>
            <simple-icon-lite icon="expand-less"></simple-icon-lite>
          </button>
        </div>
      </div>
    `;
  }

  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/sortable.haxProperties.json`, import.meta.url).href;
  }
}
