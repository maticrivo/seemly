const path = require('path');
const fs = require('fs');
const set = require('lodash/set');

const getHistory = () => {
  const historyFile = path.join(__dirname, '..', '..', 'history.json');

  return new Promise((resolve) => {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const history = require(historyFile);

      return resolve(history);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('No history.json file found');
      return resolve({});
    }
  });
};

const saveHistory = async (widget, data) => {
  const historyFile = path.join(__dirname, '..', '..', 'history.json');
  const history = await getHistory();
  set(history, [`${widget}`, 'data'], data);

  return new Promise((resolve, reject) => {
    fs.writeFile(historyFile, JSON.stringify(history), (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(true);
    });
  });
};

const emitEvent = (ctx, widget, data) => new Promise(async (resolve) => {
  ctx.io.emit('data', { widget, data: { data } });
  await ctx.saveHistory(widget, data);
  resolve(true);
});

module.exports = {
  getHistory,
  saveHistory,
  emitEvent,
};
