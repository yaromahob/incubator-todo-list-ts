import React from 'react';
import {TTodolistPropsType} from "../App";

const Todolist = (props: TTodolistPropsType) => {
  
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(task => {
          
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}/>
              <span>
              {task.title}
            </span>
              <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button
          onClick={() => props.changeFilter('all')}>
          All
        </button>
        <button onClick={() => props.changeFilter('active')}>
          Active
        </button>
        <button onClick={() => props.changeFilter('complete')}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
