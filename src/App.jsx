import { useState } from 'react'
import './App.css'
import Todos from './components/Todos'
import InputTodo from './components/InputTodo'


function App() {
  return (
    <>
      <InputTodo />
      <Todos />
    </>
  )
}

export default App
