const compose = require('koa-compose');
const Router = require('koa-router');
const Boom = require('boom');

const handleErrors = require('../middlewares/errors');
const { getHistory } = require('../utils');

const route = new Router();

route.prefix('/api');

route.use('*', handleErrors());

route.get('/reload', async (ctx) => {
  ctx.io.emit('reload');
  ctx.res.body = { reload: true };
});

route.get('/load', async (ctx) => {
  const history = await getHistory();
  ctx.response.body = history;
});

route.post('/widget/:name', async (ctx) => {
  await ctx.emitEvent(ctx, ctx.params.name, ctx.request.body);

  ctx.response.body = {
    widget: ctx.params.name,
    data: ctx.request.body,
  };
});

const api = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
]);

module.exports = api;
