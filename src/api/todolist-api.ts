import axios from "axios";



const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
  'api-key': '52a1ca5e-dff7-4291-84cc-1f73b5c262f4'
  },
  
})



export const todolistApi = {
  getTodolists() {
    return instance.get<Array<TTodolistApi>>(`todo-lists`)
  },
  createTodolist(todolistTitle: string){
    return instance.post<TTodolistResponse<{item: TTodolistApi[]}>>('todo-lists', {title: todolistTitle})
  },
  updateTodolist(todolistID: string, newTodolistTitle: string){
    return instance.put<TTodolistResponse>(`todo-lists/${todolistID}`, {title: newTodolistTitle})
  },
  deleteTodolist(todolistID: string){
    return instance.delete<TTodolistResponse>(`todo-lists/${todolistID}`)
  }
}



export type TTodolistApi = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export type TTodolistResponse<T = {}> = {
  data: T
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
}
