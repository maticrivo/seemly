const dashboardGenerator = require('./dashboard/index.js');
const widgetGenerator = require('./widget/index.js');

module.exports = (plop) => {
  plop.setGenerator('dashboard', dashboardGenerator);
  plop.setGenerator('widget', widgetGenerator);
};
