import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeTodo, deleteTodo, fetchTodos } from '../redux/TodoSlice'
import "../styles/Todo.css"

function Todos() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    if (todos.loading) {
        return <h1>loading...</h1>
    }




    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <div>

            <table>
                <thead>
                    <th>Tasks</th>
                    <th>Delete</th>
                    <th>Complete</th>
                </thead>
            </table>

            {todos.map((todo) => {
                return (
                    <tbody key={todo._id}>
                        <td>
                            <h2 className={todo.completed ? "completed" : "notCompleted"}>{todo.title}</h2>
                            <p className={todo.completed ? "completed" : "notCompleted"}>{todo.description}</p>
                        </td>
                        <td>
                            <button className='btn__delete' onClick={() => dispatch(deleteTodo(todo._id))}>delete</button>
                        </td>
                        <td>
                            <button
                                onClick={() => dispatch(completeTodo(todo._id))}
                                className={todo.completed ? "btn__completed" : "btn__notCompleted"}
                            >
                                Complete
                            </button>
                        </td>
                    </tbody>
                )
            }
            )}
        </div>
    )
}

export default Todos