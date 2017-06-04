import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Todo from './Todo'

function sortByDoneStatus(a, b, todos) {
  const doneA = todos[a].done
  const doneB = todos[b].done
  if (doneA) {
    return doneB ? 0 : 1
  }
  return !doneB ? 0 : -1
}

const TodoList = ({ todos }) => {
  const Todos = Object.keys(todos)
  .sort((a, b) => sortByDoneStatus(a, b, todos))
  .map((todoKey) => {
    const { text, done } = todos[todoKey]
    return (
      <Todo
        key={todoKey}
        id={todoKey}
        text={text}
        done={done}
      />
    )
  })
  return (
    <ul className="list ph0 lh-solid">
      {Todos}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.object,
}

const mapStateToProps = ({ todo }) => ({ todos: todo })

export default connect(mapStateToProps)(TodoList)
