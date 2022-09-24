import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid'

export type TTodolistPropsType = {
  title: string
  tasks: Array<TTodolistTask>
  removeTask: (id: string) => void
  changeFilter: (filters: TFilterValueType) => void
  addTask: (task: string) => void
}

type TTodolistTask = {
  id: string
  title: string
  isDone: boolean
}

type TFilterValueType = 'all' | 'active' | 'complete'


function App() {
  const tasksData = [
    {
      id: v1(),
      title: 'HTML/CSS',
      isDone: true,
    },
    {
      id: v1(),
      title: 'JS/TS',
      isDone: true,
    },
    {
      id: v1(),
      title: 'React',
      isDone: false,
    },
    {
      id: v1(),
      title: 'Redux',
      isDone: false,
    },
    {
      id: v1(),
      title: 'RTK',
      
      isDone: false,
    },
  
  ]
  const [tasks, setTasks] = React.useState<Array<TTodolistTask>>(tasksData)
  const [filters, setFilter] = React.useState<TFilterValueType>('all')
  const todoListTitle = 'What to learn'
  
  const removeTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id)
    
    setTasks(newTasks)
  }
  
  const changeFilter = (filters: TFilterValueType) => {
    
    setFilter(filters)
  }
  
  const addTask = (task: string) => {
    const newTask = {id: v1(), title: task, isDone: false}
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }
  
  let tasksForTodoList = tasks;
  
  if (filters === 'active') {
    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
  }
  if (filters === 'complete') {
    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
  }
  
  return (
    <div className="App">
      <Todolist
        title={todoListTitle}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    
    </div>
  );
}


export default App;
