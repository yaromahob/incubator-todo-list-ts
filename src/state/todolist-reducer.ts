import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: tsarType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.payload.id);
    
    case "ADD-TODOLIST":
      let newTodolistId = v1();
      let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
      return [newTodolist, ...state];
    
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
    }
    
    case 'CHANGE-TODOLIST-FILTER': {
      console.log(state.filter(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el));
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el);
    }
    
    default:
      return state;
  }
};

type tsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

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
      title
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