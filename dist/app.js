'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {
  var app = (0, _express2.default)();

  if (config.debug) console.log(JSON.stringify(config, process.env));
  app
  // Setup middlewares
  .use('/public', _express2.default.static(__dirname + '/public')).use(require('./middlewares/json-beautifier')).use(require('./middlewares/easy-renderer')).get('/', function (req, res) {
    res.render('index');
  });

  // Setup api
  require('./apis/status')(app);
  require('./apis/metadata')(app, config);
  require('./apis/notfound')(app);

  return app;
};