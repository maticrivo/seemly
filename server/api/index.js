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

route.get('/jobs', async (ctx) => {
  const jobs = ctx.jobs.map((job) => ({
    name: job.name,
    options: job.options,
    running: !!job.cron.running,
  }));

  ctx.response.body = jobs;
});

route.get('/jobs/:name', async (ctx) => {
  const jobs = ctx.jobs.filter((job) => job.name === ctx.params.name).map((job) => ({
    name: job.name,
    options: job.options,
    running: !!job.cron.running,
  }));

  if (jobs.length === 0) {
    throw new Boom.notFound(`Job '${ctx.params.name}' was not found.`);
  }

  ctx.response.body = jobs[0];
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
