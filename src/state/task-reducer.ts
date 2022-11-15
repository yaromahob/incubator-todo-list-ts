import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    
    case "REMOVE-TASK":
      
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      };
    
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false
      };
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
      };
    }
    
    case "CHANGE-TASK-STATUS":
      
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
          ...t,
          isDone: action.payload.isCompleted
        } : t)
      };
    
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
          ...t,
          title: action.payload.title
        } : t)]
      };
    
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.payload.todolistId]: []
      };
    
    case "REMOVE-TODOLIST":
      const newTodoList = {...state};
      delete newTodoList[action.payload.id];
      // const {[action.payload.id]: [], ...rest} = {...state}
      return newTodoList;
    
    default:
      return state;
  }
};

type ActionType =
  RemoveActionACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistACType
  | RemoveTodolistACType


type RemoveActionACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskId, todolistId
    }
  } as const;
};

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
      title,
    }
  } as const;
};

export const changeTaskStatusAC = (todolistId: string, taskID: string, isCompleted: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todolistId,
      taskID,
      isCompleted
    }
  } as const;
};

export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      todolistId,
      taskID,
      title
    }
  } as const;
};

