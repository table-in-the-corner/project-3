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
    this.addEventListener('drag', this.drag)
    this.position = 0;
    this.dragPosition = 0;
    //this.addEventListener('mou')
  }

  static get properties() {
    return {
      choice: { type: String, reflect: true },
      position: {type: Number},
      dragPosition: {type: Number},
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

  getPosition(){
    var pos = window.event
    var posY = pos.clientY;
    this.position = posY;
    console.log(this.position)
  }


  //The Mouse position, drag position, and offSetTop logic was taken nearly directly from Sean's SlimeSorting Implementation
  //The overall idea of how to go about dragging to sort each option was taken from Sean as well
  drag(ev){
    var pos = ev.clientY
    var currentIndex = 0;
    this.dragPosition = this.position - this.offsetTop
    if(pos!=0){
      this.position = pos;
    }

    for (var index=0; index < this.parentElement.children.length; index++){
      if(this === this.parentElement.children[index]){
        currentIndex = index;
      }
      if (this.dragPosition < 0){
        if (this.offsetTop - this.position > 60){
          //https://stackoverflow.com/questions/9732624/how-to-swap-dom-child-nodes-in-javascript
          //https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
          this.parentElement.insertBefore(this, this.parentElement.children[currentIndex])
        }
      }
      if (this.dragPosition > 0){
        if (this.offsetTop - this.position < -60){
          this.parentElement.insertBefore(this, this.parentElement.children[currentIndex+1].nextElementSibling)
        }
      }
    }
    

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

      .direction {
        margin: 10px;
        background-color: white;
        height: 30px;
        border-radius: 7px;
        float: right;
        border: transparent;
        box-shadow: 2px 2px 5px 0px gray;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="option" draggable="true">
        <slot name="choice">${this.choice}</slot>
        <button class="direction">
          <simple-icon-lite icon="expand-more"></simple-icon-lite>
        </button>
        <button class="direction">
          <simple-icon-lite icon="expand-less"></simple-icon-lite>
        </button>
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
