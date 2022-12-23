import {TasksStateType} from "../App/App";
import {AddTodolistACType, RemoveTodolistACType, SetTodoListsACType} from "./todolist-reducer";
import {taskApi, TaskStatusesType, TTaskApi, UpdateTaskModelType} from "../api/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setError, SetErrorType, setStatus, SetStatusType} from "../App/app-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    
    case "GET-TASKS": {
      return {
        ...state,
        [action.payload.todolistID]: [...action.payload.tasks]
      }
    }
  
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    }
    case "ADD-TASK": {
      let a = {
        ...state,
        [action.payload.todolistId]: [action.payload.task,...state[action.payload.todolistId]]
      };
      console.log(a);
      return {
        ...state,
        [action.payload.todolistId]: [action.payload.task,...state[action.payload.todolistId]]
      };
    }
    
    case "CHANGE-TASK-STATUS":{
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
          ...t,
          status: action.payload.status
        } : t)
      };
    }
    
    case "CHANGE-TASK-TITLE":{
      return {
        ...state,
        [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
          ...t,
          title: action.payload.title
        } : t)]
      };
    }
    
    case "ADD-TODOLIST":{
      return {
        ...state,
        [action.payload.todolistId]: []
      };
    }
    
    case "REMOVE-TODOLIST":{
      const newTodoList = {...state};
      delete newTodoList[action.payload.id];
      // const {[action.payload.id]: [], ...rest} = {...state}
      return newTodoList;
    }
    
  
    case "SET-TODOLISTS":{
      let copyState = {...state}
      action.payload.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }
  
    default:
      return state;
  }
};

type ActionType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof getTasksAC>
  | AddTodolistACType
  | RemoveTodolistACType
  | SetTodoListsACType
  | SetStatusType
  | SetErrorType


export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const)

export const addTaskAC = (todolistId: string, task:TTaskApi) =>
  ({type: 'ADD-TASK',payload: {todolistId, task: {...task}}} as const)

export const changeTaskStatusAC =
  (todolistId: string, taskID: string, status: TaskStatusesType) =>
  ({type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskID, status}} as const)

export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string) =>
  ({type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskID, title}} as const)

export const getTasksAC = (todolistID: string, tasks: TTaskApi[]) =>
  ({type: 'GET-TASKS', payload: {todolistID, tasks: [...tasks]}} as const)

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setStatus('loading'))
  taskApi.getTasks(todolistId)
    .then((res) => {
      dispatch(getTasksAC(todolistId, res.data.items))
      dispatch(setStatus('succeeded'))
    })
}

export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setStatus('loading'))
  taskApi.deleteTask(todolistID, taskID)
    .then((res) => {
      if(res.data.resultCode === 0){
        dispatch(removeTaskAC(taskID, todolistID))
        dispatch(setStatus('succeeded'))
      }
  }).catch(e => dispatch(setError(e)))
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setStatus('loading'))
  taskApi.createTask(todolistID, title)
    .then(res => {
      if(res.data.resultCode === 0){
        dispatch(addTaskAC(todolistID, res.data.data.item))
        dispatch(setStatus('succeeded'))
      }
  }).catch(e => dispatch(setError(e)))
}

export const updateTaskTitleTC = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setStatus('loading'))
  taskApi.updateTaskTitle(todolistID, taskID, title).then(res => {
    if(res.data.resultCode === 0){
      dispatch(changeTaskTitleAC(todolistID, taskID, title))
      dispatch(setStatus('succeeded'))
    }
  })
}


export const updateTaskTC = (todolistID: string, taskID: string, status:TaskStatusesType) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
  const task = getState()
    .tasks[todolistID].find((t) => t.id === taskID)
  
  if(task){
    const model: UpdateTaskModelType = {
      completed: false,
      title: task.title,
      deadline: task.deadline,
      status: status,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate
    }
    dispatch(setStatus('loading'))
  
    taskApi.updateTask(todolistID, taskID, model)
    .then(res => {
      dispatch(changeTaskStatusAC(todolistID, taskID, res.data.data.item.status))
      dispatch(setStatus('succeeded'))
    })
  }
}