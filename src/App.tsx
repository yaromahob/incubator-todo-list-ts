import React from 'react';
import './App.css';
import {TaskType} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {addTodolistAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import Todolist from "./components/Todolist";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {
  
  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  
  const dispatch = useDispatch();
  
  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
  }
  
  return (
    <div className="App">
      <ButtonAppBar/>
      
      <Container fixed>
        
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
                />
              </Paper>
            </Grid>;
          })}
        </Grid>
      
      </Container>
    
    </div>
  );
}


export default App;
