const compose = require('koa-compose')
const Router = require('koa-router')
const Boom = require('boom')

const handleErrors = require('../middlewares/errors')
const widgets = require('./widgets')
const jobs = require('./jobs')

const route = new Router()

route.prefix('/api')

route.use('*', handleErrors())

route.post('/refresh', async (ctx) => {
  ctx.io.emit('refresh')
  ctx.response.status = 204
})

const api = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(), // eslint-disable-line new-cap
    methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
  }),
  widgets(),
  jobs()
])

module.exports = api
