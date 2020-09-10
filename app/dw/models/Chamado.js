const { Model, DataTypes } = require("sequelize");

class Chamado extends Model {
	static init(connection){
		super.init({
			descricao_id: DataTypes.INTEGER
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "fato_chamado",
			schema: "dw"
		});
	}

	static associate(models){
		this.belongsTo(models.Tempo, {foreignKey: "tempo_id", as: "dim_tempo"});
		this.belongsTo(models.Endereco, {foreignKey: "endereco_id", as: "dim_endereco"});
		this.belongsTo(models.DescricaoFinalizacao, {foreignKey: "finalizacao_id", as: "dim_descricao_finalizacao"});
	}

}

module.exports = Chamado;