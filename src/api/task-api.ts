import axios from "axios";



const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
  'api-key': '52a1ca5e-dff7-4291-84cc-1f73b5c262f4'
  },
  
})



export const taskApi = {
  getTasks(todolistID: string) {
    
    return instance.get<TTaskResponse>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, title: string){
    
    return instance.post<TTaskCUD<{item: TTaskApi}>>(`todo-lists/${todolistID}/tasks`, {title: title})
  },
  updateTaskTitle(todolistID: string, taskID: string, title: string){
    
    return instance.put<TTaskCUD<{}>>(`todo-lists/${todolistID}/tasks/${taskID}`, {title})
  },
  updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType){
    return instance.put<TTaskCUD<{item: UpdateTaskModelType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
  deleteTask(todolistID: string, taskID: string){
    return instance.delete<TTaskCUD<{}>>(`todo-lists/${todolistID}/tasks/${taskID}`)
  }
}

export type UpdateTaskModelType = {
  title: string
  description: string
  completed: boolean
  status: TaskStatusesType
  priority: TaskPrioritiesType
  startDate: string
  deadline: string
}


export type TTaskResponse = {
  items: Array<TTaskApi>
  totalCount: number
  error: null
}

export enum TaskStatusesType {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPrioritiesType {
  Low,
  Middle,
  Hi,
  Urgently,
  Later
}


export type TTaskApi = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: number
  startDate: string
  status: number
  title: string
  todoListId: string
}

type TTaskCUD<T> = {
  data: T
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
}
