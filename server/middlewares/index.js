const compose = require('koa-compose');
const helmet = require('koa-helmet');
const cors = require('kcors');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const handleErrors = require('./errors');

const middlewares = () => compose([
  handleErrors(), // handle thrown or uncaught exceptions anywhere down the line
  helmet(), // reset HTTP headers (e.g. remove x-powered-by)
  cors(), // allow cross-origin
  compress({}), // HTTP compression
  bodyParser(), // parse request body into ctx.request.body
]);

module.exports = middlewares;
