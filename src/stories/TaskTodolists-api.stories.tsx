import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";
import { v1 } from 'uuid';
import {taskApi} from "../api/task-api";

export default {
  title: 'API/TASKS'
}


export const GetTasksTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskApi.getTasks('b353302a-327c-438e-9fe2-18ece58c8b29')
      .then((res) => {
        console.log('GET_TASKS', res);
        setState(res.data.items)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
     const taskTitle = 'I have dinner'
    taskApi.createTask('b353302a-327c-438e-9fe2-18ece58c8b29', taskTitle).then(res => {
      console.log('Create_Task', res);
    })
    
    
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "0f55db03-9e82-44ae-a5b3-a605f2052e12"
    taskApi.deleteTask('b353302a-327c-438e-9fe2-18ece58c8b29', '02fde268-c80e-47c1-8a6b-ef9b3cb10bed')
      .then(res => {
        console.log('DELETE_TASK', res);
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // const newTodolistTitle = 'ALLO DAROVA'
    // const todolistId = "b353302a-327c-438e-9fe2-18ece58c8b29"
    // taskApi.updateTaskTitle(todolistID, taskID, title )
    //   .then(res => {
    //     console.log('UPDATE_TASK', res);
    //     setState(res.data)
    //   })
    
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}