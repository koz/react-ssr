import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { basename } from 'path'

function Html(props) {
  const PROD = process.env.NODE_ENV === 'production'
  const {
    title,
    store,
    assets,
    url,
    context,
    children,
  } = props

  const {
    manifest,
    app,
    vendor,
  } = assets || {}

  const state = store.getState()

  const root = PROD && renderToString((
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        {children}
      </StaticRouter>
    </Provider>
  ))

  const initialState = `window.INITIAL_STATE = ${JSON.stringify(state).replace(/</g, '\\u003c')}`

  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {PROD && <link rel="stylesheet" href={'/static/styles.css'} type="text/css" />}
      </head>
      <body>
        {PROD ? <div id="root" dangerouslySetInnerHTML={{ __html: root }} /> : <div id="root" />}
        {PROD && <script dangerouslySetInnerHTML={{ __html: manifest.text }} />}
        {PROD && <script src={`/static/${basename(vendor.js)}`} />}
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        <script src={PROD ? `/static/${basename(app.js)}` : '/static/app.js'} />
      </body>
    </html>
  )
}

Html.propTypes = {
  url: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  assets: PropTypes.object,
  context: PropTypes.object,
  children: PropTypes.node,
}

export default Html
