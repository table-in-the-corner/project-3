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
        "questionNumber": 1,
        "question": "What is the best button?",
        "answers": ["table-in-the-corner", "viable-slime", "PenStat", "3b4b", "TheKodingKrab"],
      },
      {
        "questionNumber": 2,
        "question": "Best food?",
        "answers": ["Pizza", "Salad", "Candy", "Waffles", "Peanut Butter"],
      }
    ]
    this.correctAnswers = [];
    this.randomized = [];
    this.activeQuestion = this.questions[0].question;
    this.numberIncorrect = 0;
  }

  static get properties() {
    return {
      questionNumber: {type: String},
      activeQuestion: {type: String},
      numberIncorrect: {type: Number},
    };
  }

  shuffle(){
    while (this.shadowRoot.querySelector('#options').firstChild){
      this.shadowRoot.querySelector('#options').removeChild(this.shadowRoot.querySelector('#options').firstChild)
    }
    this.randomized = [];
    this.numberIncorrect = 0
    var selectedQuest = this.shadowRoot.querySelector('.statsContainer').querySelector('select')
    this.questions.forEach(question => {
      //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1
      if(question.questionNumber === parseInt(selectedQuest.options[selectedQuest.selectedIndex].value)){
        this.activeQuestion = question.question;
        question.answers.forEach(answer => {
          this.correctAnswers.push(answer)
          this.randomized.push(answer)
        })

        //Fisher-Yates (Knuth) Shuffle
        //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = question.answers.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [this.randomized[currentIndex], this.randomized[randomIndex]] = [
            this.randomized[randomIndex], this.randomized[currentIndex]];
        }
        this.randomized.forEach(answer => {
          var node = document.createElement("sortable-option");
          node.setAttribute("choice", answer)
          this.shadowRoot.querySelector('#options').appendChild(node);
        })
        //console.log(this.shadowRoot.querySelector('#options').childNodes)
      }
    })
  }

  check(){
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#check').disabled = true;
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#reorder').disabled = false;
    var currAnswers = [];
    var incorrectAnswers = [];
    // console.log("Random " + this.randomized);
    // console.log("Correct " + this.correctAnswers)
    for(var index=0; index < this.shadowRoot.querySelector('#options').children.length; index++){
      currAnswers.push(this.shadowRoot.querySelector('#options').children[index].getAttribute("choice"))
      this.shadowRoot.querySelector('#options').children[index].removeAttribute('incorrect')
      this.shadowRoot.querySelector('#options').children[index].shadowRoot.querySelector('.option').setAttribute('draggable', false);
    }
    console.log(currAnswers)
    for(var i=0; i < currAnswers.length; i++){
      for(var j=0; j < this.correctAnswers.length; j++){
        if(currAnswers[i] === this.correctAnswers[i]){
          continue
        } else if(!incorrectAnswers.includes(currAnswers[i])) {
          incorrectAnswers.push(currAnswers[i]);
        }
      }
    }

    this.numberIncorrect = 5 - incorrectAnswers.length;
    if(incorrectAnswers.length > 0){
      for(var index=0; index < this.shadowRoot.querySelector('#options').children.length; index++){
        if(incorrectAnswers.includes(this.shadowRoot.querySelector('#options').children[index].getAttribute("choice"))){
          //https://www.w3schools.com/jsref/met_document_createattribute.asp
          var incorrect = document.createAttribute('incorrect');
          this.shadowRoot.querySelector('#options').children[index].setAttributeNode(incorrect)
          console.log(this.shadowRoot.querySelector('#options').children[index])
        }
        
      }
      //this.shadowRoot.querySelector('#options').children[index]
    }
    console.log(incorrectAnswers)
    console.log(this.numberIncorrect)
  }

  
  reorder(){
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#reorder').disabled = true;
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#check').disabled = false;
    for(var index=0; index < this.shadowRoot.querySelector('#options').children.length; index++){
      this.shadowRoot.querySelector('#options').children[index].shadowRoot.querySelector('.option').setAttribute('draggable', true);
    }
  }
  reset(){
    this.shuffle();
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#reorder').disabled = true;
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#check').disabled = false;
    for(var index=0; index < this.shadowRoot.querySelector('#options').children.length; index++){
    this.shadowRoot.querySelector('#options').children[index].shadowRoot.querySelector('.option').setAttribute('draggable', true);
  }
}

  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('#reorder').disabled = true;
    //https://stackoverflow.com/questions/17730621/how-to-dynamically-add-options-to-an-existing-select-in-vanilla-javascript/17730724
    this.questions.forEach(question => {
      document.querySelector('sortable-frame').shadowRoot.querySelector('.statsContainer').querySelector('select').options.add(new Option(question.questionNumber, question.questionNumber))
    })
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
        border-style: solid
      }
    `;
  }

  // HTML - specific to Lit
  render() {
    return html`
      <div class="frame">
      <h1 style='padding-left: 20px'>${this.activeQuestion}</h1>
        <div slot="options" id="options">
          <!-- <sortable-option
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
          ></div> -->
        </div>
        <div class="statsContainer">
          <h1>Number correct: ${this.numberIncorrect}/${this.questions[0].answers.length}</h1>
          <button id='check' type="button" @click="${this.check}">Check</button>
          <button id='reorder' @click=${this.reorder}>Retry</button>
          <button id='reset' @click=${this.reset}>Reset</button>
          <h3>Question:</h3>
          <select name="questionList" id="questionList" @change=${this.shuffle}>
          </select>
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
