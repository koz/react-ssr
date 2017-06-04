import { generate } from 'shortid'
import {
  CREATE_TODO,
  REMOVE_TODO,
  TOGGLE_CHECK_TODO,
} from './actionTypes'

export function createTodo(text) {
  const newId = generate()
  return {
    type: CREATE_TODO,
    text,
    id: newId,
  }
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

export function checkTodo(id) {
  return {
    type: TOGGLE_CHECK_TODO,
    id,
  }
}
