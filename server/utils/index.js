const path = require('path');
const fs = require('fs');

const Utils = {};

Utils.getHistory = () => {
  const historyFile = path.join(__dirname, '..', '..', 'history.json');
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const history = require(historyFile);

      return resolve(history);
    } catch (err) {
      console.err('getHistory', 'no history file found', err);
      return reject(err);
    }
  });
};

Utils.saveHistory = (data) => {
  const historyFile = path.join(__dirname, '..', '..', 'history.json');
  return new Promise((resolve, reject) => {
    fs.writeFile(historyFile, JSON.stringify(data), (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(true);
    });
  });
};

module.exports = Utils;
