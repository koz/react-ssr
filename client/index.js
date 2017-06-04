import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux'
import configureStore from '../universal/redux/configureStore'

import App from '../universal/App'

const history = createHistory()
const store = configureStore(history, window.INITIAL_STATE)

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

renderApp(App)

// HMR API
if (module.hot) {
  module.hot.accept('../universal/App.js', () => {
    const nextApp = require('../universal/App.js').default
    renderApp(nextApp)
  })
}
