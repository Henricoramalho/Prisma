const express = require('express');
const routes = express.Router();

const clientes = require('./controller/clientescontroller')

routes.get('/clientes', clientes.read)
routes.post('/clientes', clientes.create)
routes.put('/clientes/:id', clientes.update)
routes.delete('/clientes/:id', clientes.del)

module.exports = routes