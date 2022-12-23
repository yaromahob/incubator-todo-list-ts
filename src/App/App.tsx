import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {TTaskApi} from "../api/task-api";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import TodolistContainer from "../components/Todolist/TodolistContainer";
import {useAppSelector} from "../state/store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
  [key: string]: Array<TTaskApi>
}


function App() {
  const status = useAppSelector(state => state.app.status)

  return (
    <div className="App">
      <ErrorSnackbar/>
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress color="secondary"/>}
      <Container fixed>
        <TodolistContainer/>
      </Container>
    </div>
  );
}


export default App;
