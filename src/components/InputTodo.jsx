import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/TodoSlice'
import "../styles/InputTodo.css"


function InputTodo() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()

    const onSubmitForm = (e) => {
        e.preventDefault()
        dispatch(addTodo({
            title: title,
            description: description,
            completed: false
        }))
        setTitle("")
        setDescription("")
    }

  return (
    <div className='main'>
      <h1> My Todos</h1>
      <form>
        <input
          type="text"
          value={title}
          placeholder='title'
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={onSubmitForm}>ADD</button>
      </form>
    </div>
  )
}

export default InputTodo