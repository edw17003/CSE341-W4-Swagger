const routes = require('express').Router();
const contacts = require('../controllers/contact.js');

routes.get('/', contacts.findAll);
routes.get('/:_id', contacts.findOne);
routes.post('/', contacts.create);
routes.put('/:_id', contacts.updateOne);
routes.delete('/:_id', contacts.deleteOne);

module.exports = routes;
