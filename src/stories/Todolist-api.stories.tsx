import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";
import { v1 } from 'uuid';

export default {
  title: 'API/TODOLISTS'
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
    const todolistId = "c519fe89-463f-41ef-ae46-f740ef473426"
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
    const todolistId = "6a11d681-5f28-4d6a-a0d5-4c2431b2a504"
    todolistApi.updateTodolist(todolistId, newTodolistTitle )
      .then(res => {
        console.log(res);
        setState(res.data)
      })
    
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}