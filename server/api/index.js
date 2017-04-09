const compose = require('koa-compose');
const Router = require('koa-router');
const Boom = require('boom');

const handleErrors = require('../middlewares/errors');
const widgets = require('./widgets');
const jobs = require('./jobs');

const route = new Router();

route.prefix('/api');

route.use('*', handleErrors());

route.get('/refresh', async (ctx) => {
  ctx.io.emit('refresh');
  ctx.res.body = { refresh: true };
});

const api = () => compose([
  route.routes(),
  route.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
  widgets(),
  jobs(),
]);

module.exports = api;
