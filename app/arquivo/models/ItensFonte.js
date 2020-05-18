const { Model, DataTypes } = require('sequelize');

class ItensFontes extends Model {
    static init(connection){
        super.init({
                    data: DataTypes.DATEONLY,
                    dia: DataTypes.STRING,
                    hora: DataTypes.TIME,
                    endereco: DataTypes.STRING,
                    bairro: DataTypes.STRING,
                    municipio: DataTypes.STRING,
                    cod_tipo: DataTypes.INTEGER,
                    descricao: DataTypes.TEXT,
                    cod_sub_tipo: DataTypes.INTEGER,
                    desc_sub_tipo: DataTypes.TEXT,
                    situacao_encontrada: DataTypes.TEXT,
                    descricao_finalizacao: DataTypes.TEXT,
                    historico: DataTypes.TEXT,
        },{
            freezeTableName: true,
            sequelize: connection,
            tableName: 'itens_fonte',
        });
    };
}

module.exports = ItensFontes;

// 'Data de Criação',
// 'Dia da Semana',
// 'Hora de Criação',
// 'Endereço',
// 'Bairro',
// 'Município',
// 'Cód. Tipo',
// 'Descrição',
// 'Cód. Sub Tipo',
// 'Desc. Sub Tipo',
// 'Sit. Encontrada',
// 'Descrição Finalização',
// 'Histórico'