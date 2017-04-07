const path = require('path');
const fs = require('fs');

const Utils = {};

Utils.getHistory = () => {
  let history = {};
  try {
    const historyFile = path.join(__dirname, '..', '..', 'history.json');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    history = require(historyFile);
  } catch (err) {
    console.log('getHistory', 'no history file found');
  }

  return history;
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
