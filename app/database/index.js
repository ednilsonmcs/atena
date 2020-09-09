const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Chamado = require("../arquivo/models/Chamado");
const Fonte = require("../arquivo/models/Fonte");
const ItensFonte = require("../arquivo/models/ItensFonte");
const Tempo = require("../dw/models/Tempo");
const Endereco = require("../dw/models/Endereco");
const JunkDescricao = require("../dw/models/JunkDescricao");
const DescricaoFinalizacao = require("../dw/models/DescricaoFinalizacao");

const connection = new Sequelize(dbConfig);

Chamado.init(connection);
Fonte.init(connection);
ItensFonte.init(connection);
ItensFonte.associate(connection.models);

Tempo.init(connection);
Endereco.init(connection);
JunkDescricao.init(connection);
DescricaoFinalizacao.init(connection);

module.exports = connection;