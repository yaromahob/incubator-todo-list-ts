import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddItemForm} from "../AddItemFrom/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {changeFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC} from "../../state/todolist-reducer";
import {
  addTaskTC,
  changeTaskStatusAC,
  deleteTaskTC,
  getTasksTC,
  removeTaskAC, updateTaskTC, updateTaskTitleTC
} from "../../state/task-reducer";
import Task from "../Task/Task";
import ButtonContainer from "../ButtonContainer";
import {TaskStatusesType, TTaskApi} from "../../api/task-api";



export type TodolistPropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
  addedDate: string;
  order: number;
}

const Todolist = memo(({todolistId, filter, title}: TodolistPropsType) => {
  console.log('Todolist_RERENDER');
  useEffect(() => {
    dispatch(getTasksTC(todolistId))
  },[])
  
  const dispatch = useAppDispatch();
  let tasks = useAppSelector< Array<TTaskApi>>(state => state.tasks[todolistId]);
  

  
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolistId, title))
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
  
  const changeTaskStatus = useCallback((todolistId: string, taskID: string, status: TaskStatusesType) => {
    dispatch(updateTaskTC(todolistId, taskID, status));
  }, [dispatch]);
  
  const changeTaskTitle = useCallback((todolistId: string, taskID: string, title: string) => {
    dispatch(updateTaskTitleTC(todolistId, taskID, title))
  }, [dispatch]);
  
  
  const onAllClickHandler = useCallback(() => dispatch(changeFilterAC('all', todolistId)), [dispatch, todolistId]);
  
  const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC('active', todolistId)), [dispatch, todolistId]);
  
  const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC('completed', todolistId)), [dispatch, todolistId]);
  
  const onClickRemoveHandler = useCallback((taskId: string) => {
    dispatch(deleteTaskTC(todolistId, taskId))
  }, [ removeTask, todolistId]);
  
  const onChangeStatusHandler = useCallback((taskID: string, status: TaskStatusesType) => {
    changeTaskStatus(todolistId, taskID, status);
  }, [changeTaskStatus, todolistId]);
  
  const onChangeTitleHandler = useCallback((taskID: string, newValue: string) => {
    changeTaskTitle(todolistId, taskID, newValue);
  }, [changeTaskTitle, todolistId]);
  
  
  if (filter === "active") {
    tasks = tasks.filter(t => !t.status);
  }
  if (filter === "completed") {
    tasks = tasks.filter(t => t.status);
  }
  
  return (
    <div>
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitle}/>
      {/*<button onClick={removeTodolist}>x</button>*/}
      <IconButton aria-label="delete" onClick={removeTodolist}>
        <DeleteIcon/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {
        tasks.map((t) => {


          return (
            <Task key={t.id}
                  taskID={t.id}
                  status={t.status}
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
    
    </div>
  </div>);
});

export default Todolist;
