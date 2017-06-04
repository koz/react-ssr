import express from 'express'
import http from 'http'
import { join } from 'path'
import {
  renderPage,
  renderDevPage,
} from './ssr'

const PROD = process.env.NODE_ENV === 'production'

const app = express()

if (PROD) {
  const buildPath = join(__dirname, '..', 'build')
  app.use('/static', express.static(buildPath))
  app.get('*', renderPage)
} else {
  const HMR = require('./hmr.js').default
  HMR(app)
  app.get('*', renderDevPage)
}

// Error Handling
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (!PROD) {
  app.use((err, req, res) => {
    console.error('error : ', err)
    res.status(err.status || 500)
  })
} else {
  app.use((err, req, res) => {
    console.error('error : ', err.message)
    res.status(err.status || 500)
  })
}

const server = http.createServer(app)

server.listen(3000, () => {
  const address = server.address()
  console.log(`Listen on localhost: ${address.port}`)
})
