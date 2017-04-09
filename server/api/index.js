const compose = require('koa-compose');
const Router = require('koa-router');
const Boom = require('boom');
const set = require('lodash/set');

const handleErrors = require('../middlewares/errors');
const { getHistory, saveHistory } = require('../utils');

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
  const history = await getHistory();
  set(history, [`${ctx.params.name}`, 'data'], ctx.request.body);

  await saveHistory(history);

  ctx.io.emit('data', { widget: ctx.params.name, data: history.title });
  ctx.response.body = history;
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
