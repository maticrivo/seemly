const compose = require('koa-compose');
const Router = require('koa-router');
const Boom = require('boom');

const handleErrors = require('../middlewares/errors');

const route = new Router();

route.prefix('/api/jobs');

route.use('*', handleErrors());

route.get('/', async (ctx) => {
  const jobs = ctx.jobs.map((job) => ({
    name: job.name,
    options: job.options,
    running: !!job.cron.running,
  }));

  ctx.response.body = jobs;
});

route.get('/:name', async (ctx) => {
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

const jobs = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
]);

module.exports = jobs;
