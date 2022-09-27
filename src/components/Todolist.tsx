import React, {ChangeEvent, KeyboardEvent} from 'react';
import {TTodolistPropsType} from "../App";
import {v1} from 'uuid'

const Todolist = (props: TTodolistPropsType) => {
  const [task, setTask] = React.useState<string>('')
  const [error, setError] = React.useState<string | null>(null)
  
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTask(e.target.value)
  }
  
  const addToTaskList = () => {
    const trimmedTask = task.trim()
    if (trimmedTask) {
      props.addTask(task)
    } else setError('Field is required')
    setTask('')
  }
  
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addToTaskList()
  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('complete')
  
  const tasksList = props.tasks.map(task => {
    const onRemoveHandler = () => props.removeTask(task.id)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked)
    
    return (
      <li
        className={task.isDone ? 'is-done' : ''}
        key={v1()}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={onChangeHandler}
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
          className={error ? 'error' : ''}
          value={task}
          onChange={onChangeInput}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addToTaskList}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {tasksList}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}>
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>
          Active
        </button>
        <button
          className={props.filter === 'complete' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
