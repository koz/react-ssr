import React from 'react'
import { Route } from 'react-router-dom'
import Todo from './pages/Todo'
//eslint-disable-next-line
import 'tachyons'

const App = () => (
  <Route path="/" component={Todo} />
  )

export default App
