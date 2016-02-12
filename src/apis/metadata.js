import {unlink} from 'fs';
module.exports = (app, config) => {
  app
    .use(require('multer')({dest: '/tmp'}).single('payload'))
    .post('/api/analyze', (req, res) => {
      console.log(req.file);
      unlink(req.file.path, ()  => {
        res.json({size:req.file.size});
      });
    });
  return app;
};
