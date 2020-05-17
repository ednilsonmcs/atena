const Chamado = require('../models/Chamado');
module.exports = {
    async store(req, res){
        const { nome, email } = req.body;
        const chamado = await Chamado.create({ nome, email})
        return res.json(chamado)
    }
};