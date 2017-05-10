const path = require('path');
const fs = require('fs');
const set = require('lodash/set');

const getHistory = (widget) => {
  const historyFile = path.join(__dirname, '..', '..', 'history.json');

  return new Promise((resolve) => {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const history = require(historyFile);

      return resolve(widget ? history[widget] : history);
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

const emitEvent = (ctx, widget, data) => new Promise(async (resolve, reject) => {
  try {
    ctx.io.emit('data', { widget, data: { data } });
    await ctx.saveHistory(widget, data);

    resolve(true);
  } catch (err) {
    reject(err);
  }
});

const getJobs = (jobsFolder) => new Promise((resolve, reject) => {
  fs.readdir(jobsFolder, (err, files) => {
    if (err) {
      return reject(err);
    }

    try {
      const jobs = [];

      files.filter((file) => file.slice(-3) === '.js').forEach((job) => {
        const {
          name,
          cronTime,
          onTick,
          onComplete,
          timeZone,
          runOnInit,
          // eslint-disable-next-line global-require, import/no-dynamic-require
        } = require(path.join(jobsFolder, job));

        jobs.push({
          name: name || job.slice(0, -3),
          options: { cronTime, onTick, onComplete, timeZone, runOnInit },
        });
      });

      return resolve(jobs);
    } catch (jobErr) {
      return reject(jobErr);
    }
  });
});

const jobTick = async (ctx, onTick) => {
  const { widget, data } = await onTick();
  ctx.emitEvent(ctx, widget, data);
};

module.exports = {
  getHistory,
  saveHistory,
  emitEvent,
  getJobs,
  jobTick,
};
