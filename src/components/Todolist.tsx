import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddItemForm} from "./AddItemForm";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistPropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
}

const Todolist = ({todolistId, filter, title}: TodolistPropsType) => {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId]);
  
  const dispatch = useDispatch();
  
  const addTask = (title: string) => {
    dispatch(addTaskAC(todolistId, title));
  };
  
  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolistId));
  };
  const changeTodolistTitle = () => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  };
  
  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC(taskId, todolistId));
  };
  
  const changeTaskStatus = (todolistId: string, taskID: string, isCompleted: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskID, isCompleted));
  };
  
  const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskID, title));
  };
  
  
  const onAllClickHandler = () => dispatch(changeFilterAC('all', todolistId));
  const onActiveClickHandler = () => dispatch(changeFilterAC('active', todolistId));
  const onCompletedClickHandler = () => dispatch(changeFilterAC('completed', todolistId));
  
  
  if (filter === "active") {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasks = tasks.filter(t => t.isDone);
  }
  
  return <div>
    <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
      {/*<button onClick={removeTodolist}>x</button>*/}
      <IconButton aria-label="delete" onClick={removeTodolist}>
        <DeleteIcon/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {
        tasks.map(t => {
          
          const onClickHandler = () => removeTask(t.id, todolistId);
          
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(todolistId, t.id, newIsDoneValue);
          };
          
          const onTitleChangeHandler = (newValue: string) => {
            changeTaskTitle(todolistId, t.id, newValue);
          };
          
          
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
              <DeleteIcon/>
            </IconButton>
          </li>;
        })
      }
    </ul>
    <div>
      <Button variant={filter === 'all' ? "outlined" : "contained"} color="secondary"
              onClick={onAllClickHandler}>All</Button>
      <Button variant={filter === 'active' ? "outlined" : "contained"} color="success"
              onClick={onActiveClickHandler}>Active</Button>
      <Button variant={filter === 'completed' ? "outlined" : "contained"} color="error"
              onClick={onCompletedClickHandler}>Completed</Button>
    
    </div>
  </div>;
};

export default Todolist;
