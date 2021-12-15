import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../sortable-options.js';
import '../src/SortableFrame.js';
import '../src/SortableOption.js';

describe('SortableFrame', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<sortable-frame
      activequestion="Hello"
      question="1"
      dataSource="..assets/questions.json"
    >
    </sortable-frame>`);
  });
  it('Contains proper title', () => {
    expect(element.shadowRoot.querySelector('h1').innerHTML).to.contain(
      'Hello'
    );
  });
  it('Check to be sure 5 options are listed', () => {
    expect(
      element.shadowRoot.querySelector('.statsContainer').querySelector('h1')
        .innerHTML
    ).to.contain('5');
  });
  it('Contains a div slot', async () => {
    expect(element.shadowRoot.querySelectorAll('div')[2].id).to.equal(
      'options'
    );
  });
});

describe('SortableOption', () => {
  let element2;
  beforeEach(async () => {
    element2 = await fixture(html`<sortable-frame
      activequestion="Hello"
      question="1"
      dataSource="..assets/questions.json"
    >
      <sortable-option></sortable-option>
      <sortable-option choice="Test123"></sortable-option>
    </sortable-frame>`);
  });

  it('Choice equals Option 1', async () => {
    expect(element2.querySelector('sortable-option').choice).to.equal(
      'option 1'
    );
  });

  it('Choice', () => {
    expect(element2.querySelector('sortable-option').choice).to.exist;
    expect(element2.querySelectorAll('sortable-option')[1].choice).not.to.equal(
      'option 1'
    );
  });
});
