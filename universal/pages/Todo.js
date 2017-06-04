import React from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'

const Todo = () => (
  <div className="avenir flex flex-column items-center mt4">
    <h1 className="f1">To Do</h1>
    <div className="ba br2 b--light-silver pa4 w-40">
      <TodoInput />
      <TodoList />
    </div>
  </div>
  )

Todo.propTypes = {

}

export default Todo
