'use strict';

var _fs = require('fs');

module.exports = function (app, config) {
  app.use(require('multer')({ dest: '/tmp' }).single('payload')).post('/api/analyze', function (req, res) {
    console.log(req.file);
    (0, _fs.unlink)(req.file.path, function () {
      res.json({ size: req.file.size });
    });
  });
  return app;
};