import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";


function App() {
  const todoListTitle = 'What to learn'
  const todoListTitle2 = 'What to learn'
  const tasks = [
    {
      id: 1,
      title: 'HTML&CSS',
      isDone: true
    },
    {
      id: 2,
      title: 'JS/TS',
      isDone: true
    },
    {
      id: 3,
      title: 'React',
      isDone: false
    }]
  const tasks2 = [
    {
      id: 1,
      title: 'Hello World',
      isDone: true
    },
    {
      id: 2,
      title: 'I am Happy',
      isDone: true
    },
    {
      id: 3,
      title: 'Yo',
      isDone: false
    }]
  return (
    <div className="App">
      <Todolist title={todoListTitle} tasks={tasks}/>
      <Todolist title={todoListTitle2} tasks={tasks2}/>
    </div>
  );
}


export default App;
