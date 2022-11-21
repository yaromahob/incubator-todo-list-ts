import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskType = {
  taskID: string
  isDone: boolean
  title: string
  onClickRemove: (taskId: string) => void
  onChangeStatus: (taskID: string, isCompleted: boolean) => void
  onChangeTitle: (taskID: string, title: string) => void
}

const Task: React.FC<TaskType> = memo(({
                                         taskID,
                                         isDone,
                                         title,
                                         onClickRemove,
                                         onChangeStatus,
                                         onChangeTitle
                                       }) => {
  console.log('TASK_RERENDER');
  
  const onClickRemoveHandler = () => onClickRemove(taskID);
  
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let isCompleted = e.currentTarget.checked;
    onChangeStatus(taskID, isCompleted);
  };
  
  const onChangeTitleHandler = (newValue: string) => {
    onChangeTitle(taskID, newValue);
  };
  
  return (
    <li key={taskID} className={isDone ? "is-done" : ""}>
      <Checkbox onChange={onChangeStatusHandler} checked={isDone}/>
      <EditableSpan value={title} onChange={onChangeTitleHandler}/>
      <IconButton aria-label="delete" onClick={onClickRemoveHandler}>
        <DeleteIcon/>
      </IconButton>
    </li>
  );
});

export default Task;
