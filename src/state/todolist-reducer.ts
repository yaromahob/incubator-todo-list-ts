import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = [];


export const todolistsReducer = (state = initialState, action: tsarType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.payload.id);
    
    case "ADD-TODOLIST":
      let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
      return [newTodolist, ...state];
    
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
    }
    
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el);
    }
    
    default:
      return state;
  }
};

type tsarType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
  } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todolistId: v1()
    }
  } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title,
    }
  } as const;
};

export const changeFilterAC = (filter: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id,
      filter
    }
  } as const;
};