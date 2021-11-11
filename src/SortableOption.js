import { LitElement, html, css } from 'lit';

export class SortableOption extends LitElement {
  static get tag() {
    return 'sortable-option';
  }

  constructor() {
    super();
    this.choice = 'option 1';
  }

  static get properties() {
    return {
      choice: { type: String, reflect: true },
    };
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
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

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .option {
        display: block;
        font-family: 'Open Sans', sans-serif;
        color: black;
        margin: 20px;
        padding: 10px;
        box-shadow: 2px 2px 5px 0px gray;
        background-color: lightgray;
        height: 60px;
        min-width: 700px;
        border-radius: 7px;
        text-align: left;
      }

      .direction {
        margin: 10px;
        background-color: white;
        height: 30px;
        border-radius: 7px;
        float: right;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="option">
        <slot name="choice">${this.choice}</slot>
        <button class="direction">down</button>
        <button class="direction">up</button>
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
