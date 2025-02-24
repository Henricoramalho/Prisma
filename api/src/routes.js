const express = require('express');
const routes = express.Router();

const clientes = require('./controller/clientescontroller')
const comida = require('./controller/comidacontroller')

routes.get('/clientes', clientes.read)
routes.post('/clientes', clientes.create)
routes.put('/clientes/:id', clientes.update)
routes.delete('/clientes/:id', clientes.del)

routes.get('/comida', comida.read)
routes.post('/comida', comida.create)
routes.put('/comida/:id', comida.update)
routes.delete('/comida/:id', comida.del)

module.exports = routes