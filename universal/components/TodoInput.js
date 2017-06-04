import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTodo } from '../redux/actions'

class TodoInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {value} = this.state
    const {createTodo} = this.props
    createTodo(value)
  }

  render () {
    const { value } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className="relative mb4"
      >
        <input
          id="name"
          className="outline-0 input-reset ba b--black-20 pv2 pl2 pr4 mb2 db w-100"
          type="text"
          aria-describedby="todo"
          value={value}
          onChange={this.handleChange}
        />
        <input
          className="outline-0 input-reset bn f3 pv1 ph2 bg-transparent absolute dim pointer"
          style={{
            top: 0,
            right: '0.5rem',
          }}
          type="submit"
          value="+"
        />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    createTodo: text => dispatch(createTodo(text)),
  }
)


export default connect(null, mapDispatchToProps)(TodoInput)
