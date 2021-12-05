import { LitElement, html, css } from 'lit';

export class SortableFrame extends LitElement {
  static get tag() {
    return 'sortable-frame';
  }

  constructor() {
    super();
    this.need = 'abc';
    this.questions = [
      {
        questionNumber: 1,
        question: 'What is the best button?',
        answers: [
          'table-in-the-corner',
          'viable-slime',
          'PenStat',
          '3b4b',
          'TheKodingKrab',
        ],
      },
      {
        questionNumber: 2,
        question: 'Best food?',
        answers: ['Pizza', 'Salad', 'Candy', 'Waffles', 'Peanut Butter'],
      },
    ];
    this.correctAnswers = [];
    this.randomized = [];
    this.currAnswers = [];
    this.questionNumber = 1;
    this.activeQuestion = '';
    // this.activeQuestion = this.questions[0].question;
    this.numberIncorrect = 0;
  }

  static get properties() {
    return {
      questionNumber: { type: String, reflect: true },
      activeQuestion: { type: String, reflect: true },
      numberIncorrect: { type: Number },
    };
  }

  shuffle() {
    while (this.shadowRoot.querySelector('#options').firstChild) {
      this.shadowRoot
        .querySelector('#options')
        .removeChild(this.shadowRoot.querySelector('#options').firstChild);
    }

    this.randomized = [];
    this.correctAnswers = [];
    this.numberIncorrect = 5;
    const selectedQuest = this.shadowRoot
      .querySelector('.statsContainer')
      .querySelector('select');
    this.questions.forEach(question => {
      // https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1

      if (
        // eslint-disable-next-line radix
        question.questionNumber ===
        parseInt(selectedQuest.options[selectedQuest.selectedIndex].value)
      ) {
        this.activeQuestion = question.question;
        this.questionNumber = question.questionNumber;
        question.answers.forEach(answer => {
          this.correctAnswers.push(answer);
          this.randomized.push(answer);
          this.currAnswers = [];
        });

        // Fisher-Yates (Knuth) Shuffle
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = question.answers.length;
        let randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          [this.randomized[currentIndex], this.randomized[randomIndex]] = [
            this.randomized[randomIndex],
            this.randomized[currentIndex],
          ];
        }
        this.randomized.forEach(answer => {
          const node = document.createElement('sortable-option');
          node.setAttribute('choice', answer);
          this.shadowRoot.querySelector('#options').appendChild(node);
        });
        // console.log(this.shadowRoot.querySelector('#options').childNodes[0])
      }
    });
    // document.querySelector('sortable-frame').shadowRoot.querySelector('.frame').querySelector("#options").querySelectorAll('sortable-option').forEach(option => {
    //   option.shadowRoot.querySelectorAll('button').forEach(but => {
    //     // eslint-disable-next-line no-param-reassign
    //     console.log(but)
    //   })
    // })
    // console.log(document.querySelector('sortable-frame').shadowRoot.querySelector('.frame').querySelector("#options").querySelectorAll('sortable-option')[0])
    // console.log(document.querySelector('sortable-frame').shadowRoot.querySelector('.frame').querySelector("#options").querySelectorAll('sortable-option').querySelector('.up'))
    // document.querySelector('sortable-frame').shadowRoot.querySelector('.frame').querySelector("#options").querySelectorAll('sortable-option')[0].shadowRoot.querySelector('.up').disabled = true
  }

  check() {
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = true;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = false;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.frame')
      .querySelector('#options')
      .querySelectorAll('sortable-option')
      .forEach(option => {
        option.shadowRoot.querySelectorAll('button').forEach(but => {
          // eslint-disable-next-line no-param-reassign
          but.disabled = true;
        });
        option.shadowRoot.querySelectorAll('button').forEach(simpleIcon => {
          // eslint-disable-next-line no-param-reassign
          simpleIcon.disabled = true;
        });
        // console.log(option.shadowRoot.querySelectorAll('button'))
      });
    // console.log(document.querySelector('sortable-frame').shadowRoot.querySelector('.frame').querySelector("#options").querySelectorAll('sortable-option'))
    // const currAnswers = [];
    const incorrectAnswers = [];
    this.currAnswers = [];
    // console.log("Random " + this.randomized);
    // console.log("Correct " + this.correctAnswers)
    for (
      let index = 0;
      index < this.shadowRoot.querySelector('#options').children.length;
      index += 1
    ) {
      this.currAnswers.push(
        this.shadowRoot
          .querySelector('#options')
          .children[index].getAttribute('choice')
      );
      this.shadowRoot
        .querySelector('#options')
        .children[index].removeAttribute('incorrect');
      this.shadowRoot
        .querySelector('#options')
        .children[index].shadowRoot.querySelector('.option')
        .setAttribute('draggable', false);
    }
    // console.log(currAnswers)
    for (let i = 0; i < this.currAnswers.length; i += 1) {
      for (let j = 0; j < this.correctAnswers.length; j += 1) {
        if (this.currAnswers[i] === this.correctAnswers[i]) {
          // eslint-disable-next-line no-continue
          continue;
        } else if (!incorrectAnswers.includes(this.currAnswers[i])) {
          incorrectAnswers.push(this.currAnswers[i]);
        }
      }
    }

    this.numberIncorrect = incorrectAnswers.length;
    if (incorrectAnswers.length > 0) {
      for (
        let index = 0;
        index < this.shadowRoot.querySelector('#options').children.length;
        index += 1
      ) {
        if (
          incorrectAnswers.includes(
            this.shadowRoot
              .querySelector('#options')
              .children[index].getAttribute('choice')
          )
        ) {
          // https://www.w3schools.com/jsref/met_document_createattribute.asp
          const incorrect = document.createAttribute('incorrect');
          this.shadowRoot
            .querySelector('#options')
            .children[index].setAttributeNode(incorrect);
          // console.log(this.shadowRoot.querySelector('#options').children[index])
        }
      }
      // this.shadowRoot.querySelector('#options').children[index]
    }
    // console.log(incorrectAnswers)
    // console.log(this.numberIncorrect)
    // if(this.numberIncorrect)

    // All answers correct!
    if (this.numberIncorrect === 0) {
      document
        .querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')
        .forEach(option => {
          /* eslint-disable no-param-reassign */
          option.shadowRoot.querySelector('.option').style.backgroundColor =
            'green';
          option.shadowRoot.querySelector('slot').style.color = 'black';
          /* eslint-enable no-param-reassign */
          document
            .querySelector('sortable-frame')
            .shadowRoot.querySelector('.statsContainer')
            .querySelector('#reorder').disabled = true;
        });
    }
  }

  reorder() {
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = false;
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
    for (
      let index = 0;
      index < this.shadowRoot.querySelector('#options').children.length;
      index += 1
    ) {
      this.shadowRoot
        .querySelector('#options')
        .children[index].shadowRoot.querySelector('.option')
        .setAttribute('draggable', true);
      this.shadowRoot
        .querySelector('#options')
        .children[index].removeAttribute('incorrect');
    }
  }

  reset() {
    this.shuffle();
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = false;
    for (
      let index = 0;
      index < this.shadowRoot.querySelector('#options').children.length;
      index += 1
    ) {
      if (
        this.shadowRoot
          .querySelector('#options')
          .children[index].shadowRoot.querySelector('.option')
      ) {
        this.shadowRoot
          .querySelector('#options')
          .children[index].shadowRoot.querySelector('.option')
          .setAttribute('draggable', true);
      }
    }
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    // https://stackoverflow.com/questions/17730621/how-to-dynamically-add-options-to-an-existing-select-in-vanilla-javascript/17730724
    this.questions.forEach(question => {
      document
        .querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('select')
        .options.add(
          new Option(question.questionNumber, question.questionNumber)
        );
    });
    // document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('select').selectedIndex = 0
    this.shuffle();
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
  // /* eslint-disable class-methods-use-this */
  // dragStartHandler(event) {
  //   event.dataTransfer.setData('text/html', event.target.outerHTML);
  // }

  // dragHandler(event) {
  //   event.dataTransfer.setData('text/html', event.target.id);
  // }

  // dropAllower(event) {
  //   event.preventDefault();
  // }

  // dropHandler(event) {
  //   event.preventDefault();
  //   let data = event.dataTransfer.getData('text/html');
  //   const temp = new DOMParser().parseFromString(data, 'text/html');
  //   this.shadowRoot.querySelectorAll('sortable-option').forEach(el => {
  //     if (!temp.body.firstChild) {
  //       return;
  //     }
  //     console.log(temp.body.firstChild);
  //     if (el.id === temp.body.firstChild.id) {
  //       const node = el.nextElementSibling;
  //       const nodeId = temp.body.firstChild.id;
  //       event.target.replaceWith(temp.body.firstChild);
  //       el.nextElementSibling.remove();
  //       el.remove();
  //       this.shadowRoot
  //         .querySelector(`#${nodeId}`)
  //         .previousElementSibling.insertAdjacentElement(
  //           'afterend',
  //           event.target
  //         );
  //       this.shadowRoot.querySelector(`#${nodeId}`).parentElement.append(node);
  //       data = '';
  //     }
  //     // continue
  //   });
  // }
  // /* eslint-enable class-methods-use-this */

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
        margin-bottom: 10px;
        background-color: burlywood;
        /* opacity: 0.5; */
      }
      .statsContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
      }
      sortable-option[incorrect] {
        border-width: 2px;
        border-color: red;
        border-style: solid;
      }
      sortable-option[incorrect]:nth-child(n) {
        background-color: red;
      }
      .questionContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="frame">
        <div class="questionContainer">
          <h1>${this.activeQuestion}</h1>
        </div>
        <div slot="options" id="options"></div>
        <div class="statsContainer">
          <h1>
            Number correct:
            ${this.questions[this.questionNumber - 1].answers.length -
            this.numberIncorrect}/${this.questions[this.questionNumber - 1]
              .answers.length}
          </h1>
          <div>
            <button id="check" type="button" @click="${this.check}">
              Check
            </button>
            <button id="reorder" @click=${this.reorder}>Retry</button>
            <button id="reset" @click=${this.reset}>Reset</button>
          </div>
          <div
            style="display: flex; flex-direction: row; justify-content: center; align-items: center"
          >
            <h3 style="padding-right: 5px">Question:</h3>
            <select
              name="questionList"
              id="questionList"
              @change=${this.shuffle && this.reset}
            ></select>
          </div>
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
