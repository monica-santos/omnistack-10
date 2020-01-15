const { Router } = require('express');
const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');
const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/dev', DevController.store);
routes.delete('/dev/:id', DevController.destroy);
routes.get('/search', SearchController.index);

module.exports = routes;
