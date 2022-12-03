import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import App from "../App";

import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/AppWithRedux',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App/>;


export const AppStory = Template.bind({});

//--------------------------------------------------------


