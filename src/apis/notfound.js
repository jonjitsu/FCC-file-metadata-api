
module.exports = function(app) {
    app
        .use(function(req, res) {
            res.sendStatus(404);
        });
   
   return app;
};
