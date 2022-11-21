import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "../App";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";
import Task from "./Task";
import ButtonContainer from "./ButtonContainer";

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

const Todolist = memo(({todolistId, filter, title}: TodolistPropsType) => {
  console.log('Todolist_RERENDER');
  
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId]);
  
  const dispatch = useDispatch();
  
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(todolistId, title));
    },
    [dispatch, todolistId],
  );
  
  
  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistAC(todolistId));
  }, [dispatch, todolistId]);
  
  const changeTodolistTitle = useCallback(() => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  }, [dispatch, todolistId, title]);
  
  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(removeTaskAC(taskId, todolistId));
  }, [dispatch]);
  
  const changeTaskStatus = useCallback((todolistId: string, taskID: string, isCompleted: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskID, isCompleted));
  }, [dispatch]);
  
  const changeTaskTitle = useCallback((todolistId: string, taskID: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskID, title));
  }, [dispatch]);
  
  
  const onAllClickHandler = useCallback(() => dispatch(changeFilterAC('all', todolistId)), [dispatch, todolistId]);
  
  const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC('active', todolistId)), [dispatch, todolistId]);
  
  const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC('completed', todolistId)), [dispatch, todolistId]);
  
  const onClickRemoveHandler = useCallback((taskId: string) => removeTask(taskId, todolistId), [removeTask, todolistId]);
  
  const onChangeStatusHandler = useCallback((taskID: string, isCompleted: boolean) => {
    changeTaskStatus(todolistId, taskID, isCompleted);
  }, [changeTaskStatus, todolistId]);
  
  const onChangeTitleHandler = useCallback((taskID: string, newValue: string) => {
    changeTaskTitle(todolistId, taskID, newValue);
  }, [changeTaskTitle, todolistId]);
  
  
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
          
          
          return (
            <Task key={t.id}
                  taskID={t.id}
                  isDone={t.isDone}
                  title={t.title}
                  onChangeStatus={onChangeStatusHandler}
                  onChangeTitle={onChangeTitleHandler}
                  onClickRemove={onClickRemoveHandler}
            />
          );
        })
      }
    </ul>
    <div>
      <ButtonContainer filter={filter}
                       buttonTitle={'All'}
                       buttonColor={"secondary"}
                       callback={onAllClickHandler}/>
      <ButtonContainer filter={filter}
                       buttonTitle={'Active'}
                       buttonColor={"success"}
                       callback={onActiveClickHandler}/>
      <ButtonContainer filter={filter}
                       buttonTitle={'Completed'}
                       buttonColor={"error"}
                       callback={onCompletedClickHandler}/>
      {/*<Button variant={filter === 'all' ? "outlined" : "contained"} color="secondary"
      "secondary" | "success" | "error"
      */}
      {/*        onClick={onAllClickHandler}>All</Button>*/}
      {/*<Button variant={filter === 'active' ? "outlined" : "contained"} color="success"*/}
      {/*        onClick={onActiveClickHandler}>Active</Button>*/}
      {/*<Button variant={filter === 'completed' ? "outlined" : "contained"} color="error"*/}
      {/*        onClick={onCompletedClickHandler}>Completed</Button>*/}
    
    </div>
  </div>;
});

export default Todolist;
