import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";
import { v1 } from 'uuid';

export default {
  title: 'API'
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistApi.getTodolists()
      .then((res) => {
        console.log(res.data);
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

     const todolistTitle = 'I have dinner'

    todolistApi.createTodolist(todolistTitle).then(res => {
      console.log(res);
    })
    
    
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "0f55db03-9e82-44ae-a5b3-a605f2052e12"
    todolistApi.deleteTodolist(todolistId)
      .then(res => {
        console.log(res);
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const newTodolistTitle = 'AbraCadabraAPIAPI'
    const todolistId = "b353302a-327c-438e-9fe2-18ece58c8b29"
    todolistApi.updateTodolist(todolistId, newTodolistTitle )
      .then(res => {
        console.log(res);
        setState(res.data)
      })
    
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}