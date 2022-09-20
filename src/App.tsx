import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type TTodolistPropsType = {
  title: string
  tasks: Array<TTodolistTask>
  removeTask: (id: number) => void
  changeFilter: (filters: TFilterValueType) => void
}

type TTodolistTask = {
  id: number
  title: string
  isDone: boolean
}

type TFilterValueType = 'all' | 'active' | 'complete'


function App() {
  const tasksData = [
    {
      id: 1,
      title: 'HTML/CSS',
      isDone: true,
    }, {
      id: 2,
      title: 'JS/TS',
      isDone: true,
    }, {
      id: 3,
      title: 'React',
      isDone: false,
    }, {
      id: 4,
      title: 'Redux',
      isDone: false,
    }, {
      id: 5,
      title: 'RTK',
      isDone: false,
    },
  
  ]
  const [tasks, setTasks] = React.useState<Array<TTodolistTask>>(tasksData)
  const [filters, setFilter] = React.useState<TFilterValueType>('all')
  const todoListTitle = 'What to learn'
  
  const removeTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  
  const changeFilter = (filters: TFilterValueType) => {
    setFilter(filters)
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
      />
    
    </div>
  );
}


export default App;
