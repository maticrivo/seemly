const compose = require('koa-compose')
const Router = require('koa-router')
const Boom = require('boom')

const handleErrors = require('../middlewares/errors')
const { getHistory, saveHistory } = require('../utils')

const route = new Router()

route.prefix('/api/widgets')

route.use('*', handleErrors())

route.get('/', async (ctx) => {
  const history = await getHistory()
  ctx.response.body = history
})

route.get('/:name', async (ctx) => {
  const history = await getHistory(ctx.params.name)

  if (!history) {
    throw new Boom.notFound(`Widget '${ctx.params.name}' has no history.`) // eslint-disable-line new-cap
  }

  ctx.response.body = {
    [ctx.params.name]: history
  }
})

route.put('/:name', async (ctx) => {
  const widget = ctx.params.name
  const data = ctx.request.body
  ctx.io.emit('data', { widget, data: { data } })
  await saveHistory(widget, data)

  ctx.response.body = {
    [widget]: { data }
  }
})

const widgets = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(), // eslint-disable-line new-cap
    methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
  })
])

module.exports = widgets
