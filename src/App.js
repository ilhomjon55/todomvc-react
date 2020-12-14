import { useState } from 'react';

function App() {
	let [todos, setTodos] = useState([]);

	const date = new Date();
	const hours = date.getHours();
	let timeOfDay;

	if (hours < 12) {
		timeOfDay = 'morning';
	} else if (hours >= 12 && hours < 17) {
		timeOfDay = 'afternoon';
	} else {
		timeOfDay = 'night';
	}

	const createTodo = (evt) => {
		if (evt.code === 'Enter' && evt.target.value !== '') {
			const newTodo = {
				id: todos.length + 1,
				title: evt.target.value.trim(),
				completed: false,
			};

			setTodos([...todos, newTodo]);

			evt.target.value = '';
		}
	};

	const completeTask = (evt) => {
		evt.target.closest('div').nextElementSibling.classList.toggle('del');

		if (evt.target.checked) {
			const indexjon = todos.findIndex(
				(t) => t.id === Number(evt.target.closest('li').dataset.liId)
			);

			setTodos(
				[...todos],
				(todos[indexjon].completed = !todos[indexjon].completed)
			);
		} else {
			const indexjon = todos.findIndex(
				(t) => t.id === Number(evt.target.closest('li').dataset.liId)
			);

			setTodos(
				[...todos],
				(todos[indexjon].completed = !todos[indexjon].completed)
			);
		}
	};

	const deleteTodo = (todo) => {
		setTodos(todos.filter((t) => t.id !== todo.id));
	};

	const deleteAllTodos = () => {
		setTodos((todos = []));
	};

	const renderAll = () => {
		setTodos(todos);
	};

	let uncompletedTodos = todos.filter((t) => !t.completed);

	const showTodosLeft = () => {
		console.log(uncompletedTodos.length);
		return uncompletedTodos.length;
	};

	const renderActive = () => {
		setTodos(todos.filter((t) => !t.completed));
	};

	const renderCompleted = () => {
		setTodos(todos.filter((t) => t.completed));
	};

	return (
		<>
			<main>
				<div className='container w-50'>
					<h2 className='h1 text-center text-danger my-3'>
						Good {timeOfDay}! Happy day!
					</h2>

					<input
						className='tasks__input form-control mb-1 form-control-lg js-tasks__input'
						onKeyUp={createTodo}
						type='text'
						name='user_task'
						aria-label='What you want to do'
						placeholder='Add todo'
						required
					/>

					<ul className='tasks__list list-group-fluish list-unstyled js-tasks__list overflow-auto'>
						{todos.map((todo) => {
							return (
								<li
									key={todo.id}
									data-li-id={todo.id}
									className='tasks__item list-group-item d-flex alert align-items-center p-2 border-right-0 border-left-0 border-top-0'>
									<div className='custom-control custom-checkbox mr-3 flex-shrink-0'>
										<input
											onClick={completeTask}
											className='tasks__completed-checkbox custom-control-input'
											type='checkbox'
											name='task_completed'
											id={`todo_${todo.id}`}
											aria-label='Delete'
										/>
										<label
											className='tasks__completed-label custom-control-label'
											htmlFor={`todo_${todo.id}`}></label>
									</div>

									<p className='tasks__text mr-auto m-0 overflow-auto'>
										{todo.title}
									</p>

									<button
										onClick={deleteTodo.bind(null, todo)}
										className='tasks__remove-btn btn text-danger font-weight-bold js-remove-task-btn'
										type='button'>
										&#10005;
									</button>
								</li>
							);
						})}
					</ul>

					<div className='tasks__filter-btns-box d-flex flex-column flex-sm-row justify-content-between align-items-center'>
						<p className='m-0'>
							<span className='tasks__left js-tasks__left mr-1'>
								{showTodosLeft}
							</span>
							tasks left
						</p>

						<div className='tasks__features-filter my-2 my-sm-0'>
							<button
								onClick={renderAll}
								className='tasks__filter-all btn btn-sm btn-outline-secondary js-tasks__filter-all'
								type='button'>
								All
							</button>
							<button
								onClick={renderActive}
								className='tasks__filter-active mx-1 btn btn-sm btn-outline-primary js-tasks__filter-active'
								type='button'>
								Active
							</button>
							<button
								onClick={renderCompleted}
								className='tasks__filter-completed btn btn-sm btn-outline-success js-tasks__filter-completed'
								type='button'>
								Completed
							</button>
						</div>

						<button
							onClick={deleteAllTodos}
							className='tasks__clear-completed btn btn-sm btn-danger js-tasks__clear-completed'
							type='button'>
							Clear all
						</button>
					</div>
				</div>
			</main>
		</>
	);
}
export default App;
