import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argsTypes: {
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    },
    onChange: {
      description: 'Value EditableSpan changed'
    }
  }
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

//--------------------------------------------------------

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  value: 'EditableSpan',
  onChange: action('value EditableSpan changed'),
  
  
};
//--------------------------------------------------------


// More on args: https://storybook.js.org/docs/react/writing-stories/args
