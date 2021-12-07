import { html } from 'lit';

import '../sortable-options.js';

export default {
  title: 'Option',
  component: 'sortable-option',
  argTypes: {
    question: { control: 'text' },
  },
};

function Template({ question = this.question }) {
  return html` <sortable-frame activequestion="${question}">
    <slot name="options"></slot>
  </sortable-frame>`;
}
export const SortableOptions = Template.bind({});
