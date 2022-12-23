import {v1} from "uuid";
import {todolistApi, TTodolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setStatus, SetStatusType} from "../App/app-reducer";

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TTodolistApi & {
  filter: FilterValuesType
}



export const todolistsReducer = (state:Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.payload.id);
    
    case "ADD-TODOLIST":
      
      return [
        {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "all",
        addedDate: '',
        order: 0,
      },
        ...state
      ]
    
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
    }
    
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el);
    }
    case "SET-TODOLISTS":{
      return action.payload.map((tl) => ({...tl, filter: "all"}))
    }
  
    default:
      return state;
  }
};



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

export const setTodoListsAC = (todolists: TTodolistApi[]) => {
  return {
    type: 'SET-TODOLISTS',
    payload: todolists
  } as const
}

export const getTodolistTC = () => (dispatch: Dispatch) => {
  dispatch(setStatus('loading'))
  todolistApi.getTodolists()
    .then(res => {
      dispatch(setTodoListsAC(res.data))
      dispatch(setStatus('succeeded'))
    })
}

type ActionsType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeFilterACType
  | SetTodoListsACType
  | SetStatusType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>

