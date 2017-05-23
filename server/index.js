const path = require('path')
const http = require('http')
const { CronJob } = require('cron')
const Koa = require('koa')
const IO = require('socket.io')
const nextjs = require('next')
const Router = require('koa-router')
const middlewares = require('./middlewares')
const api = require('./api')
const { emitEvent, saveHistory, getJobs, jobTick } = require('./utils')

const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  try {
    const koa = new Koa()
    const router = new Router()
    const server = http.createServer(koa.callback())
    const io = IO(server)

    koa.context.io = io
    koa.context.emitEvent = emitEvent
    koa.context.saveHistory = saveHistory
    koa.context.jobs = await getJobs(path.join(__dirname, '..', 'jobs'))

    koa.use(middlewares())
    koa.use(api())

    koa.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    router.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })
    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res)
    })
    koa.use(router.routes())

    server.listen(3000, (err) => {
      if (err) {
        throw err
      }

      console.log('> Ready on http://localhost:3000')
    })

    koa.context.jobs.map((job) => {
      const onTick = job.options.onTick
      job.options.onTick = () => jobTick(koa.context, onTick)

      const cron = new CronJob(job.options)
      cron.start()
      job.cron = cron

      return job
    })
  } catch (error) {
    console.error('Could not initialize app', error)
    process.exit(1)
  }
})
