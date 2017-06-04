import React from 'react'
import fs from 'fs'
import {
  join,
  basename,
} from 'path'
import createHistory from 'history/createMemoryHistory'
import { renderToStaticMarkup } from 'react-dom/server'
import Html from './Html'
import configureStore from '../universal/redux/configureStore'
import assetsJSON from '../build/assets.json'
import initialState from './initialState'

const PROD = process.env.NODE_ENV === 'production'

function renderApp(url, res, store, assets, App) {
  const html = renderToStaticMarkup(
    <Html
      title="To Do List"
      store={store}
      url={url}
      context={{}}
      assets={assets}
    >
      {App && <App />}
    </Html>,
  )

  res.send(`<!DOCTYPE html>${html}`)
}

export const renderPage = async (req, res) => {
  const history = createHistory()
  const store = configureStore(history, initialState)
  const assets = {
    ...assetsJSON,
    manifest: {
      text: fs.readFileSync(
        join(__dirname, '..', 'build', basename(assetsJSON.manifest.js)),
        'utf-8',
      ),
    },
  }
  const App = PROD ? require('../build/prerender.js').default : () => {}
  renderApp(req.url, res, store, assets, App)
}

export const renderDevPage = async (req, res) => {
  const history = createHistory()
  const store = configureStore(history, initialState)

  renderApp(req.url, res, store)
}
