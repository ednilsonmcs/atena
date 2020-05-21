const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Chamado = require('../arquivo/models/Chamado');
const Fonte = require('../arquivo/models/Fonte');
const ItensFonte = require('../arquivo/models/ItensFonte');

const connection = new Sequelize(dbConfig);

Chamado.init(connection);
Fonte.init(connection);
ItensFonte.init(connection);

module.exports = connection;