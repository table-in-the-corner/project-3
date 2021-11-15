import { LitElement, html, css } from 'lit';

export class SortableFrame extends LitElement {
  static get tag() {
    return 'sortable-frame';
  }

  constructor() {
    super();
    this.need = 'abc';
  }

  static get properties() {
    return {};
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

  // https://stackoverflow.com/questions/53986159/drag-and-drop-how-to-get-the-actual-html-in-dragstart-event-and-drop-event
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
  /* eslint-disable class-methods-use-this */
  dragStartHandler(event) {
    event.dataTransfer.setData('text/html', event.target.outerHTML);
  }

  dragHandler(event) {
    event.dataTransfer.setData('text/html', event.target.id);
  }

  dropAllower(event) {
    event.preventDefault();
  }

  dropHandler(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text/html');
    const temp = new DOMParser().parseFromString(data, 'text/html');
    this.shadowRoot.querySelectorAll('sortable-option').forEach(el => {
      if (!temp.body.firstChild) {
        return;
      }
      console.log(temp.body.firstChild);
      if (el.id === temp.body.firstChild.id) {
        const node = el.nextElementSibling;
        const nodeId = temp.body.firstChild.id;
        event.target.replaceWith(temp.body.firstChild);
        el.nextElementSibling.remove();
        el.remove();
        this.shadowRoot
          .querySelector(`#${nodeId}`)
          .previousElementSibling.insertAdjacentElement(
            'afterend',
            event.target
          );
        this.shadowRoot.querySelector(`#${nodeId}`).parentElement.append(node);
        data = '';
      }
      // continue
    });
  }
  /* eslint-enable class-methods-use-this */

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .frame {
        background-color: beige;
        border-radius: 8px;
        border-width: 2px;
        border-style: solid;
        border-color: black;
      }
      .dropContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: '100%';
        height: 40px;
        margin-left: 20px;
        margin-right: 20px;
        background-color: burlywood;
        /* opacity: 0.5; */
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="frame">
        <div slot="options">
          <h1>Question Here:</h1>
          <sortable-option
            choice="Option 1"
            @dragstart="${this.dragStartHandler}"
            id="option1"
          ></sortable-option>
          <div
            @drop="${this.dropHandler}"
            @dragover="${this.dropAllower}"
            class="dropContainer"
            id="container1"
          ></div>
          <sortable-option
            choice="Option 2"
            @dragstart="${this.dragStartHandler}"
            id="option2"
          ></sortable-option>
          <div
            @drop="${this.dropHandler}"
            @dragover="${this.dropAllower}"
            class="dropContainer"
            id="container2"
          ></div>
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
    return new URL(`../lib/sortableframe.haxProperties.json`, import.meta.url)
      .href;
  }
}
