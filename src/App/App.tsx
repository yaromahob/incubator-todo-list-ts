import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import TodolistContainer from "../components/Todolist/TodolistContainer";
import {useAppSelector} from "../state/store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {
  const status = useAppSelector(state => state.app.status);
  
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
