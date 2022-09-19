import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

export type TTodolistPropsType = {
  title: string
  tasks: Array<TTodolistTask>
  removeTask: (id: number) => void
}

type TTodolistTask = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const tasksData = [
    {
      id: 1,
      title: 'HTML/CSS',
      isDone: false,
    }, {
      id: 2,
      title: 'JS/TS',
      isDone: false,
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
  
  const todoListTitle = 'What to learn'
  
  
  const removeTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id)
    
    setTasks(newTasks)
  }
  
  
  return (
    <div className="App">
      <Todolist title={todoListTitle} tasks={tasks} removeTask={removeTask}/>
    
    </div>
  );
}


export default App;
