const http = require('http');
const Koa = require('koa');
const IO = require('socket.io');
const Boom = require('boom');
const nextjs = require('next');
const Router = require('koa-router');
const middlewares = require('./middlewares');

const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const koa = new Koa();
  const router = new Router();
  const server = http.createServer(koa.callback());
  const io = IO(server);

  router.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
  });

  koa.use(middlewares());

  koa.use(router.routes());
  koa.use(router.allowedMethods({
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }));

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
  });
});
