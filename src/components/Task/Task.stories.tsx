import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Task from './Task';
import { TaskStatusesType } from '../../api/task-api';



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    taskID: '123',
    title: 'TodolistTasks',
    isDone: true,
    onClickRemove: action('On remove task'),
    onChangeStatus: action('On change task status'),
    onChangeTitle: action('Change task title')
  }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

//--------------------------------------------------------

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskisDoneStory = Template.bind({});

TaskisDoneStory.args = {
  status: TaskStatusesType.Completed,
};
//--------------------------------------------------------

export const TaskisNotDoneStory = Template.bind({});

TaskisNotDoneStory.args = {
  status: TaskStatusesType.New,
};


// More on args: https://storybook.js.org/docs/react/writing-stories/args
