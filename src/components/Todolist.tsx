import React, {ChangeEvent, KeyboardEvent} from 'react';
import {TFilterValueType, TTodolistTask} from "../App";
import {v1} from 'uuid'

type TTodolistPropsType = {
	todolistID: string
	title: string
	tasks: Array<TTodolistTask>
	removeTask: (todolistID: string, taskID: string) => void
	changeFilter: (todolistID: string, filters: TFilterValueType) => void
	addTask: (todolistID: string, task: string) => void
	removeTodolist: (todolistID: string) => void
	changeTaskStatus: (todolistID: string, taskId: string, completedTask: boolean) => void
	filterTask: TFilterValueType
}

const Todolist = (props: TTodolistPropsType) => {
	const [task, setTask] = React.useState<string>('')
	const [error, setError] = React.useState<string | null>(null)

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setTask(e.target.value)
	}

	const addToTaskList = () => {
		const trimmedTask = task.trim()
		if (trimmedTask) {
			props.addTask(props.todolistID, task)
		} else setError('Field is required')
		setTask('')
	}

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addToTaskList()
	const onAllClickHandler = () => props.changeFilter(props.todolistID, 'all')
	const onActiveClickHandler = () => props.changeFilter(props.todolistID, 'active')
	const onCompletedClickHandler = () => props.changeFilter(props.todolistID, 'complete')
	const delTodolistHandler = () => props.removeTodolist(props.todolistID)

	const tasksList = props.tasks.map(task => {
		const onRemoveHandler = () => props.removeTask(props.todolistID, task.id)
		const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, task.id, event.currentTarget.checked)

		return (
			<li
				className={task.isDone ? 'is-done' : ''}
				key={v1()}>
				<input
					type="checkbox"
					checked={task.isDone}
					onChange={onChangeHandler}
				/>
				<span>
          {task.title}
        </span>
				<button onClick={onRemoveHandler}>x</button>
			</li>
		)
	})

	return (
		<div>
			<div className="title-wrapper">
				<h3>{props.title}</h3>
				<button onClick={delTodolistHandler}>x</button>
			</div>
			<div>
				<input
					type="text"
					className={error ? 'error' : ''}
					value={task}
					onChange={onChangeInput}
					onKeyDown={onKeyPressHandler}
				/>
				<button onClick={addToTaskList}>+</button>
				{error && <div className='error-message'>{error}</div>}
			</div>
			<ul>
				{tasksList}
			</ul>
			<div>
				<button
					className={props.filterTask === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}>
					All
				</button>
				<button
					className={props.filterTask === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}>
					Active
				</button>
				<button
					className={props.filterTask === 'complete' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}>
					Completed
				</button>
			</div>
		</div>
	);
};

export default Todolist;
