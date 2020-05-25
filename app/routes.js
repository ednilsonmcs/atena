const express = require('express');
const ChamadoController = require('./arquivo/controllers/ChamadoController');
const FonteController = require('./arquivo/controllers/FonteController');
const ItensFonteController = require('./arquivo/controllers/ItensFonteController');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({hello: 'World'});
})

routes.post('/chamados', ChamadoController.store);
routes.post('/carregarFonte', (req, res) => {
    //Antes de chamar as controles verificar se o arquivo existe
    FonteController.store(req, res);
    ItensFonteController.store(req, res)
});

module.exports = routes; 