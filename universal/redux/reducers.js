import {
  CREATE_TODO,
  REMOVE_TODO,
  TOGGLE_CHECK_TODO,
} from './actionTypes'

export default function reducer(state = {}, action) {
  const { text, id } = action
  switch (action.type) {
    case CREATE_TODO: {
      return {
        ...state,
        [id]: {
          text,
          done: false,
        },
      }
    }
    case REMOVE_TODO: {
      const newState = { ...state }
      delete newState[id]
      return newState
    }
    case TOGGLE_CHECK_TODO: {
      const checkedTodo = state[id]
      checkedTodo.done = !state[id].done
      return {
        ...state,
        [id]: checkedTodo,
      }
    }
    default:
      return state
  }
}
