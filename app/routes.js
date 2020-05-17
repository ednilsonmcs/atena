const express = require('express');
const ChamadoController = require('./arquivo/controllers/ChamadoController');
const FonteController = require('./arquivo/controllers/FonteController');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({hello: 'World'});
})

routes.post('/chamados', ChamadoController.store);
routes.post('/carregarFonte', FonteController.store);

module.exports = routes; 