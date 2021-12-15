import { LitElement, html, css } from 'lit';

const golden = new URL('../assets/goldenretriever.jpeg', import.meta.url).href;
const husky = new URL('../assets/husky.jpeg', import.meta.url).href;
const memedog = new URL('../assets/memedog.jpeg', import.meta.url).href;

export class SortableFrame extends LitElement {
  static get tag() {
    return 'sortable-frame';
  }

  constructor() {
    super();
    this.need = 'abc';
    this.dataSource = '../assets/questions.json';
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
      {
        questionNumber: 3,
        question: 'Best dog?',
        answers: [golden, husky, memedog],
      },
    ];
    this.correctAnswers = [];
    this.randomized = [];
    this.currAnswers = [];
    this.questionNumber = 1;
    this.activeQuestion = '';
    this.numberIncorrect = 0;
  }

  static get properties() {
    return {
      questionNumber: { type: String, reflect: true },
      activeQuestion: { type: String, reflect: true },
      numberIncorrect: { type: Number },
      dataSource: { type: String, reflect: true },
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
    // this.numberIncorrect = 5;
    const selectedQuest = this.shadowRoot
      .querySelector('.statsContainer')
      .querySelector('select');
    this.questions.forEach(question => {
      if (
        this.shadowRoot.querySelector('.statsContainer').querySelector('select')
          .options.length !== this.questions.length
      )
        this.shadowRoot
          .querySelector('.statsContainer')
          .querySelector('select')
          .options.add(
            new Option(question.questionNumber, question.questionNumber)
          );

      // https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1

      if (
        selectedQuest &&
        selectedQuest.options &&
        selectedQuest.options[selectedQuest.selectedIndex] &&
        // eslint-disable-next-line radix
        question.questionNumber ===
          parseInt(selectedQuest.options[selectedQuest.selectedIndex].value, 10)
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
        this.shadowRoot
          .querySelector('.frame')
          .querySelector('.statsContainer')
          .querySelector('#reorder').disabled = true;
        if (document.querySelector('body').querySelector('h-a-x')) {
          // https://stackoverflow.com/questions/54610139/shadowroot-property-is-null-despite-open
          customElements.whenDefined('sortable-frame').then(() => {
            document
              .querySelector('body')
              .querySelector('h-a-x')
              .shadowRoot.querySelector('sortable-frame')
              .shadowRoot.querySelector('.frame')
              .querySelector('#options')
              .querySelectorAll('sortable-option')[0]
              .shadowRoot.querySelector('.up').disabled = true;
            if (
              document
                .querySelector('body')
                .querySelector('h-a-x')
                .shadowRoot.querySelector('sortable-frame')
                .shadowRoot.querySelector('.frame')
                .querySelector('#options')
                .querySelectorAll('sortable-option')
                [
                  document
                    .querySelector('body')
                    .querySelector('h-a-x')
                    .shadowRoot.querySelector('sortable-frame')
                    .shadowRoot.querySelector('.frame')
                    .querySelector('#options').children.length - 1
                ].shadowRoot.querySelector('.down')
            ) {
              document
                .querySelector('body')
                .querySelector('h-a-x')
                .shadowRoot.querySelector('sortable-frame')
                .shadowRoot.querySelector('.frame')
                .querySelector('#options')
                .querySelectorAll('sortable-option')
                [
                  document
                    .querySelector('body')
                    .querySelector('h-a-x')
                    .shadowRoot.querySelector('sortable-frame')
                    .shadowRoot.querySelector('.frame')
                    .querySelector('#options').children.length - 1
                ].shadowRoot.querySelector('.down').disabled = true;
            }
          });
        }
      }
    });
    this.numberIncorrect = this.randomized.length;
  }

  check() {
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = true;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#check').disabled = true;
    }

    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = false;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#reorder').disabled = false;
    }

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

    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
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
        });
    }

    // const currAnswers = [];
    const incorrectAnswers = [];
    this.currAnswers = [];

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
        .children[index].removeAttribute('correct');
      this.shadowRoot
        .querySelector('#options')
        .children[index].shadowRoot.querySelector('.option')
        .setAttribute('draggable', false);
    }

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
        } else {
          const correct = document.createAttribute('correct');
          this.shadowRoot
            .querySelector('#options')
            .children[index].setAttributeNode(correct);
        }
      }
    }

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

      if (document.querySelector('body').querySelector('h-a-x')) {
        document
          .querySelector('body')
          .querySelector('h-a-x')
          .shadowRoot.querySelector('sortable-frame')
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
              .querySelector('body')
              .querySelector('h-a-x')
              .shadowRoot.querySelector('sortable-frame')
              .shadowRoot.querySelector('.statsContainer')
              .querySelector('#reorder').disabled = true;
          });
      }
    }
  }

  reorder() {
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#reorder').disabled = true;
    }

    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = false;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#check').disabled = false;
    }

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
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')
        .forEach(option => {
          option.shadowRoot.querySelectorAll('button').forEach(but => {
            // eslint-disable-next-line no-param-reassign
            but.disabled = false;
          });
          option.shadowRoot.querySelectorAll('button').forEach(simpleIcon => {
            // eslint-disable-next-line no-param-reassign
            simpleIcon.disabled = false;
          });
          // console.log(option.shadowRoot.querySelectorAll('button'))
        });
    }

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
      this.shadowRoot
        .querySelector('#options')
        .children[index].removeAttribute('correct');
    }
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.frame')
      .querySelector('#options')
      .querySelectorAll('sortable-option')[0]
      .shadowRoot.querySelector('.up').disabled = true;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.frame')
        .querySelector('#options')
        .querySelectorAll('sortable-option')[0]
        .shadowRoot.querySelector('.up').disabled = true;
    }

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

      if (document.querySelector('body').querySelector('h-a-x')) {
        document
          .querySelector('body')
          .querySelector('h-a-x')
          .shadowRoot.querySelector('sortable-frame')
          .shadowRoot.querySelector('.frame')
          .querySelector('#options')
          .querySelectorAll('sortable-option')
          [
            document
              .querySelector('body')
              .querySelector('h-a-x')
              .shadowRoot.querySelector('sortable-frame')
              .shadowRoot.querySelector('.frame')
              .querySelector('#options').children.length - 1
          ].shadowRoot.querySelector('.down').disabled = true;
      }
    }
  }

  reset() {
    this.shuffle();
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#reorder').disabled = true;
    }

    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#check').disabled = false;
    if (document.querySelector('body').querySelector('h-a-x')) {
      document
        .querySelector('body')
        .querySelector('h-a-x')
        .shadowRoot.querySelector('sortable-frame')
        .shadowRoot.querySelector('.statsContainer')
        .querySelector('#check').disabled = false;
    }

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

  async loadJSONData(str) {
    await fetch(str, {
      method: this.method,
    })
      // eslint-disable-next-line consistent-return
      .then(response => {
        if (response.ok) return response.text();
      })
      .then(text => {
        this.questions = [...JSON.parse(text).questions];
      });
  }

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'dataSource' && this[propName].endsWith('.json')) {
        // eslint-disable-next-line global-require
        await this.loadJSONData('../assets/questions.json');

        this.shuffle();
      }
    });
    // this.numberIncorrect = this.randomized.length;
    document
      .querySelector('sortable-frame')
      .shadowRoot.querySelector('.statsContainer')
      .querySelector('#reorder').disabled = true;
    // https://stackoverflow.com/questions/17730621/how-to-dynamically-add-options-to-an-existing-select-in-vanilla-javascript/17730724
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
      sortable-option[correct] {
        border-width: 2px;
        border-color: green;
        border-style: solid;
      }
      sortable-option[correct]:nth-child(n) {
        background-color: green;
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
