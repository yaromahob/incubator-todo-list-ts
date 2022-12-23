import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid/Grid";
import {AddItemForm} from "../AddItemFrom/AddItemForm";
import Paper from "@mui/material/Paper/Paper";
import Todolist from "./Todolist";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {addTodolistAC, getTodolistTC, TodolistDomainType} from "../../state/todolist-reducer";

const TodolistContainer = () => {
  let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
  const dispatch = useAppDispatch();
  
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch],
  );
  
  useEffect(() => {
    dispatch(getTodolistTC())
  }, [])
  
  
  return (
      <>
      <Grid container style={{padding: "40px 40px 40px 0px"}}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
    
      <Grid container spacing={3}>
        {todolists.map(tl => {
        
          return <Grid item key={tl.id}>
            <Paper style={{padding: "10px"}}>
              <Todolist
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                addedDate={tl.addedDate}
                order={tl.order}
              />
            </Paper>
          </Grid>;
        })}
      </Grid>

      </>
  );
};

export default TodolistContainer;
