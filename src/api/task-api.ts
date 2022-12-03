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
    
    return instance.get<TTaskResponse>(`todo-lists/b353302a-327c-438e-9fe2-18ece58c8b29/tasks`)
  },
  createTask(todolistID: string, title: string){
    
    return instance.post<TTaskCUD>(`todo-lists/b353302a-327c-438e-9fe2-18ece58c8b29/tasks`, {title: "ALLO DAROVA"})
  },
  updateTaskTitle(todolistID: string, title: string){
    
    return instance.put<TTaskCUD>(`todo-lists/b353302a-327c-438e-9fe2-18ece58c8b29/tasks/5da9e1f5-2c41-4270-b395-3aa7d27efc41`, {title: 'ALLO---DAROVA'})
  },
  deleteTask(todolistID: string, taskID: string){
    
    return instance.delete<TTaskCUD>(`todo-lists/b353302a-327c-438e-9fe2-18ece58c8b29/tasks/5da9e1f5-2c41-4270-b395-3aa7d27efc41`)
  }
}


export type TTaskResponse = {
  items: Array<TTaskApi>
  totalCount: number
  error: null
}


export type TTaskApi = {
  addedDate: string
  deadline: null
  description: null
  id: string
  order: number
  priority: number
  startDate: null
  status: number
  title: string
  todoListId: string
}

type TTaskCUD<T = {}> = {
  data: T
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
}
