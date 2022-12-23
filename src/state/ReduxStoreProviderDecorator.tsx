import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers, legacy_createStore} from "redux";
import { v1 } from 'uuid'
import { tasksReducer } from './task-reducer'
import { todolistsReducer } from './todolist-reducer'
import {TaskPrioritiesType, TaskStatusesType} from "../api/task-api";




const initialGlobalState = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      addedDate: '',
      order: 0,
      filter: 'all'
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      addedDate: '',
      order: 0,
      filter: 'all'
    },
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {
        addedDate: '',
        deadline: '',
        description: '',
        id: v1(),
        order: 0,
        priority: TaskPrioritiesType.Low,
        startDate: '',
        status: TaskStatusesType.New,
        title: 'HTML&CSS',
        todoListId: 'todolistId1',
      },
      {
        addedDate: '',
        deadline: '',
        description: '',
        id: v1(),
        order: 0,
        priority: TaskPrioritiesType.Low,
        startDate: '',
        status: TaskStatusesType.New,
        title: 'JS',
        todoListId: 'todolistId1',
      },
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true},
      {
        addedDate: '',
        deadline: '',
        description: '',
        id: v1(),
        order: 0,
        priority: TaskPrioritiesType.Low,
        startDate: '',
        status: TaskStatusesType.New,
        title: 'Milk',
        todoListId: 'todolistId2',
      },
      {
        addedDate: '',
        deadline: '',
        description: '',
        id: v1(),
        order: 0,
        priority: TaskPrioritiesType.Low,
        startDate: '',
        status: TaskStatusesType.New,
        title: 'React Book',
        todoListId: 'todolistId2',
      },
    ]
  }
}


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

type AppRootStateStoryType = ReturnType<typeof rootReducer>

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateStoryType)


export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => (
  <Provider
    store={storyBookStore}>{storyFn()}
  </Provider>)



