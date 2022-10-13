import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid'


export type TTodolistTask = {
	id: string
	title: string
	isDone: boolean
}

export type TFilterValueType = 'all' | 'active' | 'complete'

type TTodolist = {
	id: string
	title: string
	filterTask: TFilterValueType
}

export type TTodoTask = {
	[todolistID: string]: Array<TTodolistTask>

}

function App() {
	const todolistID_1 = v1()
	const todolistID_2 = v1()
	const [todoLists, setTodolists] = React.useState<Array<TTodolist>>([
		{
			id: todolistID_1,
			title: 'What to learn',
			filterTask: 'all'
		},
		{
			id: todolistID_2,
			title: 'What to buy',
			filterTask: 'all'
		},
	])
	const [tasks, setTasks] = React.useState<TTodoTask>({
		[todolistID_1]: [
			{
				id: v1(),
				title: 'HTML/CSS',
				isDone: true,

			},
			{
				id: v1(),
				title: 'JS/TS',
				isDone: true,
			},
			{
				id: v1(),
				title: 'React',
				isDone: false,
			},
			{
				id: v1(),
				title: 'Redux',
				isDone: false,
			},
			{
				id: v1(),
				title: 'RTK',
				isDone: false,
			},
		],
		[todolistID_2]: [
			{
				id: v1(),
				title: 'Milk',
				isDone: true,

			},
			{
				id: v1(),
				title: 'Bread',
				isDone: true,
			},
			{
				id: v1(),
				title: 'Butter',
				isDone: false,
			},
			{
				id: v1(),
				title: 'Cherry',
				isDone: false,
			},
			{
				id: v1(),
				title: 'Tomatoes',
				isDone: false,
			},
		],
	})

	const removeTask = (todolistID: string, taskID: string) => {
		setTasks({
			...tasks,
			[todolistID]: tasks[todolistID].filter(t => t.id !== taskID)
		})
	}

	const changeFilter = (todolistID: string, filters: TFilterValueType) => {
		setTodolists(todoLists.filter(t => t.id === todolistID ? t.filterTask = filters : t.filterTask))
	}

	const addTask = (todolistID: string, task: string) => {
		const newTask: TTodolistTask = {id: v1(), title: task, isDone: false}

		setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
	}

	const changeTaskStatus = (todolistID: string, taskId: string, completedTask: boolean) => {

		setTasks({
			...tasks,
			[todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: completedTask} : t)
		})
	}

	const getFilteredTasks = (taskList: Array<TTodolistTask>, filterType: TFilterValueType) => {
		let tasksForTodoList = taskList;
		if (filterType === 'active') {
			tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
		}
		if (filterType === 'complete') {
			tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
		}
		return tasksForTodoList
	}

	const removeTodolist = (todolistID: string) => {
		setTodolists(todoLists.filter(t => t.id !== todolistID))
		delete tasks[todolistID]
	}

	const todoListComponents = todoLists.map(t => {
		const filteredTasks = getFilteredTasks(tasks[t.id], t.filterTask)

		return <Todolist key={t.id}
										 todolistID={t.id}
										 title={t.title}
										 tasks={filteredTasks}
										 filterTask={t.filterTask}
										 addTask={addTask}
										 removeTask={removeTask}
										 removeTodolist={removeTodolist}
										 changeFilter={changeFilter}
										 changeTaskStatus={changeTaskStatus}
		/>
	})
	return (
		<div className="App">
			{todoListComponents}
		</div>
	);
}


export default App;
