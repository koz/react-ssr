import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Checkbox from './Checkbox'
import {
  checkTodo,
  removeTodo
} from '../../../redux/actions'

class Todo extends Component {
  handleCheck = () => {
    const {id, checkTodo } = this.props
    checkTodo(id)
  }

  handleDelete = () => {
    const {id, deleteTodo} = this.props
    deleteTodo(id)
  }

  render() {
    const { text, id, done } = this.props
    const textClasses = done ? 'strike gray' : ''
    return (
      <li className="flex items-center justify-between pv3 bb b--light-silver">
        <div className="dib">
          <Checkbox
            done={done}
            handleCheck={this.handleCheck}
          />
          <span className={textClasses}>
            {text}
          </span>
        </div>
        <button
          className="bn bg-transparent f5 fw2 red dim pointer outline-0"
          onClick={this.handleDelete}
        >
          x
        </button>
      </li>
    )
  }
}

Todo.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  checkTodo: id => dispatch(checkTodo(id)),
  deleteTodo: id => dispatch(removeTodo(id)),
})

export default connect(null, mapDispatchToProps)(Todo)
