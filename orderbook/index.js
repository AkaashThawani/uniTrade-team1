const service = require('./orderbook-service');
require('./../db/init-db')

module.exports = function (app) {
  app.get('/orderbook', service.orderBookList);
}