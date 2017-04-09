const compose = require('koa-compose');
const Router = require('koa-router');
const Boom = require('boom');

const handleErrors = require('../middlewares/errors');
const { getHistory } = require('../utils');

const route = new Router();

route.prefix('/api/widgets');

route.use('*', handleErrors());

route.get('/', async (ctx) => {
  const history = await getHistory();
  ctx.response.body = history;
});

route.get('/:name', async (ctx) => {
  const history = await getHistory(ctx.params.name);

  if (!history) {
    throw new Boom.notFound(`Widget '${ctx.params.name}' has no history.`);
  }

  ctx.response.body = {
    [ctx.params.name]: history,
  };
});

route.put('/:name', async (ctx) => {
  await ctx.emitEvent(ctx, ctx.params.name, ctx.request.body);

  ctx.response.body = {
    [ctx.params.name]: {
      data: ctx.request.body,
    },
  };
});

const widgets = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
]);

module.exports = widgets;
