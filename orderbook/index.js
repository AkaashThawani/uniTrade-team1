const service = require('./orderbook-service');

module.exports = function (app) {
  app.get('/orderbook', service.orderBookList);
}