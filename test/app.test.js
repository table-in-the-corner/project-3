import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../rename-me.js';
import '../sortable-frame.js';
import '../sortable-option.js';

describe('RenameMe', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<rename-me></rename-me>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('cool');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

describe('SortableFrame',() =>{
  let element;
  beforeEach(async () =>{
    element = await fixture(html`<sortable-frame></sortable-frame>`);
  });
  it('Check golden image link', () =>{
    expect(element.shadowRoot.querySelector('img').src).to.equal(
      'http://localhost:8000/assets/goldenretriever.jpeg'
    );
  });
  it('Contains a div slot', async () => {
    expect(element.shadowRoot.querySelectorAll('div slot')[0].name).to.equal(
      'options'
    );
  });
});

describe('SortableOption',() =>{
  let element;
  beforeEach(async () =>{
    element = await fixture(html`<sortable-option></sortable-option>`);
  });

  it('Contains a div slot', async () => {
    expect(element.shadowRoot.querySelectorAll('div slot')[0].name).to.equal(
      'choice'
    );
  });
  
});
