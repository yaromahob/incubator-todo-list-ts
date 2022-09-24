import React, {ChangeEvent, KeyboardEvent} from 'react';
import {TTodolistPropsType} from "../App";
import {v1} from 'uuid'

const Todolist = (props: TTodolistPropsType) => {
  const [task, setTask] = React.useState<string>('')
  
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }
  
  const addToTaskList = () => {
    props.addTask(task)
    setTask('')
  }
  
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      addToTaskList()
      
    }
  }
  
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('complete')
  
  const tasksList = props.tasks.map(task => {
    const onRemoveHandler = () => props.removeTask(task.id)
    return (
      <li key={v1()}>
        <input
          type="checkbox"
          checked={task.isDone}
        />
        <span>
          {task.title}
        </span>
        <button onClick={onRemoveHandler}>x</button>
      </li>
    )
  })
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={task}
          onChange={onChangeInput}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addToTaskList}>+</button>
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}>
          All
        </button>
        <button onClick={onActiveClickHandler}>
          Active
        </button>
        <button onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
