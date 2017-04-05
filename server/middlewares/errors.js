const Boom = require('boom');

module.exports = function handleErrors() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.error(error.message, error.stack);
      let boom = error;
      if (!boom.isBoom) {
        boom = new Boom.badImplementation(error.message);
      }

      ctx.body = boom.output.payload;
      ctx.status = boom.output.statusCode;
    }
  };
};
